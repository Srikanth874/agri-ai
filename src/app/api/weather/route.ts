import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const q = searchParams.get("q"); // city name fallback

  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Weather API key not configured" }, { status: 500 });
  }

  try {
    const query = lat && lon ? `${lat},${lon}` : q || "Bengaluru";
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7&aqi=yes`,
      { next: { revalidate: 600 } } // cache 10 minutes
    );

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: "Weather API error", details: errData },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Shape the response for frontend
    const weather = {
      location: {
        name: data.location?.name,
        region: data.location?.region,
        country: data.location?.country,
        lat: data.location?.lat,
        lon: data.location?.lon,
      },
      current: {
        temp_c: data.current?.temp_c,
        temp_f: data.current?.temp_f,
        condition: data.current?.condition?.text,
        icon: data.current?.condition?.icon,
        humidity: data.current?.humidity,
        wind_kph: data.current?.wind_kph,
        wind_dir: data.current?.wind_dir,
        pressure_mb: data.current?.pressure_mb,
        feelslike_c: data.current?.feelslike_c,
        uv: data.current?.uv,
        vis_km: data.current?.vis_km,
        air_quality: data.current?.air_quality,
      },
      forecast: data.forecast?.forecastday?.map((day: any) => ({
        date: day.date,
        maxtemp_c: day.day?.maxtemp_c,
        mintemp_c: day.day?.mintemp_c,
        condition: day.day?.condition?.text,
        icon: day.day?.condition?.icon,
        chance_of_rain: day.day?.daily_chance_of_rain,
        humidity: day.day?.avghumidity,
        maxwind_kph: day.day?.maxwind_kph,
      })),
      agriculture: getAgricultureAdvice(data),
    };

    return NextResponse.json(weather);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}

function getAgricultureAdvice(data: any) {
  const temp = data.current?.temp_c || 25;
  const humidity = data.current?.humidity || 50;
  const rainChance = data.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain || 0;

  const advice: string[] = [];

  if (rainChance > 60) {
    advice.push("🌧️ High rain expected. Avoid spraying pesticides today.");
    advice.push("💧 Skip irrigation — natural rain will suffice.");
  } else if (rainChance > 30) {
    advice.push("🌦️ Moderate rain chance. Plan outdoor work for morning hours.");
  } else {
    advice.push("☀️ Low rain chance. Good day for fieldwork and spraying.");
  }

  if (temp > 38) {
    advice.push("🔥 Extreme heat alert! Mulch around plants to retain moisture.");
    advice.push("💧 Increase irrigation frequency. Water early morning or late evening.");
  } else if (temp > 32) {
    advice.push("☀️ Hot weather. Ensure adequate irrigation for sensitive crops.");
  } else if (temp < 10) {
    advice.push("❄️ Cold alert! Cover frost-sensitive crops.");
  }

  if (humidity > 80) {
    advice.push("🍄 High humidity increases fungal disease risk. Monitor crops closely.");
  } else if (humidity < 30) {
    advice.push("🏜️ Very dry conditions. Consider misting for sensitive crops.");
  }

  return {
    tips: advice,
    irrigationNeeded: rainChance < 40 && temp > 25,
    sprayingOk: rainChance < 30 && data.current?.wind_kph < 15,
  };
}
