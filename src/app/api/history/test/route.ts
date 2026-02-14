import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Historical data proxy server is working!',
    timestamp: new Date().toISOString(),
    status: 'ok',
    endpoints: {
      main: '/api/history',
      method: 'POST',
      description: 'Fetch historical vehicle tracking data'
    }
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
