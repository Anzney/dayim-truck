import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()

    // API Configuration for historical data
    const baseUrl = "https://www.awtltrack.com/app/index.php"
    const params = {
      c: "api",
      a: "trackDataReport"
    }

    // Build URL with query parameters
    const url = new URL(baseUrl)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    // Prepare request body with authentication
    const requestBody = {
      auth: {
        username: "dc.Tracking",
        password: "Track@dc1000"
      },
      data: {
        vehicleNo: body.vehicleNo || "",
        fromDate: body.fromDate || "",
        toDate: body.toDate || "",
        intervel: body.intervel || "All",
        filter: body.filter || "All Data"
      }
    }

    // Make the request to the external API
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; DayimTruck/1.0)',
        'token': 'A4h2M8LLsqR81D'
      },
      body: JSON.stringify(requestBody),
      // Add timeout
      signal: AbortSignal.timeout(15000) // 15 second timeout for historical data
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Return the data with CORS headers
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error: any) {
    console.error('Historical Data Proxy API Error:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch historical data',
        message: error.message
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    )
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
