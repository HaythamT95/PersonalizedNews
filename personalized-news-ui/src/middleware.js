
import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(request) {
    console.log('running')
    const isLogged = getCookie('logged')
    console.log(request.url)

}