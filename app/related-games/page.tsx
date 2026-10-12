import type {Metadata} from "next";
import data from "@/content/related-games.json";
import {DiscoveryDirectory} from "@/components/GameDiscovery";
export const metadata: Metadata = {
 title: {absolute:data.title},description:data.description,alternates:{canonical:"https://fatetriggerguide.com/related-games"},
 robots:{index:(!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") && process.env.NODE_ENV === "production",follow:(!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") && process.env.NODE_ENV === "production"},
 openGraph:{type:"website",title:data.title,description:data.description,url:"https://fatetriggerguide.com/related-games"},
 twitter:{card:"summary",title:data.title,description:data.description}
};
export default function RelatedGamesPage(){return <div id="main" className="gd-page"><DiscoveryDirectory /></div>;}
