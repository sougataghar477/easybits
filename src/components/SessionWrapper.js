'use client';
import { SessionProvider } from "next-auth/react";
export default function SessionWrapper({children}){
     return   <SessionProvider>
            <div className="max-w-[640px] mx-auto p-4">
             {children}
            </div>
        </SessionProvider>
}