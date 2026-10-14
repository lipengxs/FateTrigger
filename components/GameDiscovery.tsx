import Link from "next/link";
import data from "@/content/related-games.json";

type Recommendation = {name:string;url:string;category?:string;tags?:string;reason:string;difference:string};
type ArticleLink = {title:string;path:string;summary:string};
type GuideRecommendations = {path:string;entries:Recommendation[]};
export function DiscoveryHome() {
 return <section className="gd-home" aria-label="Discover other games"><h2>Explore more games</h2><p>{data.intro}</p><Link href="/related-games">Compare games and independent guides →</Link></section>;
}
export function DiscoveryFooter() {return <div className="gd-footer"><Link href="/related-games">Explore More Games</Link></div>;}
export function DiscoveryCards({entries,linkRel}:{entries:Recommendation[];linkRel?:string}) {
 return <div className="gd-grid">{entries.map(entry=><article className="gd-card" key={entry.url}><p className="gd-label">{entry.tags || entry.category || "FURTHER READING"}</p><h3>{entry.name}</h3><p>{entry.reason}</p><p className="gd-difference"><strong>What changes: </strong>{entry.difference}</p><a href={entry.url} rel={linkRel} data-guide-domain={new URL(entry.url).hostname}>Read the independent guide<span className="sr-only">: {entry.name}</span> →</a></article>)}</div>;
}
export function GuideRecommendations({path}:{path:string}) {
 const group=(data.guideRecommendations as GuideRecommendations[]).find(group=>group.path===path);
 if(!group)return null;
 return <section className="gd-section" aria-label="Related games and guides"><h2>Another world to explore</h2><p>Independent guides from the same operator, selected for this topic.</p><DiscoveryCards entries={group.entries}/><p><Link href="/related-games">Explore all related games →</Link></p></section>;
}
export function DiscoveryDirectory() {
 const categories=[...new Set(data.entries.map(entry=>entry.category))];
 const articles=data.articles as ArticleLink[];
 const schema={"@context":"https://schema.org","@type":"CollectionPage",name:data.title,description:data.description,url:data.origin+"/related-games",mainEntity:{"@type":"ItemList",itemListElement:data.entries.map((entry,index)=>({"@type":"ListItem",position:index+1,name:entry.name,url:entry.url}))}};
 return <><nav className="gd-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link> / Related games</nav><header className="gd-intro"><p className="gd-label">INDEPENDENT GAME DISCOVERY</p><h1>{data.title}</h1><p>{data.intro}</p><p className="gd-disclosure">{data.disclosure}</p></header><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>{categories.map(category=><section className="gd-category" key={category}><h2>{category}</h2><DiscoveryCards entries={data.entries.filter(entry=>entry.category===category)} linkRel={data.directoryLinkRel}/></section>)}{articles.length>0&&<section className="gd-section"><h2>Read our comparisons</h2><ul>{articles.map(article=><li key={article.path}><Link href={article.path}>{article.title}</Link><p>{article.summary}</p></li>)}</ul></section>}<section className="gd-section"><h2>Check the game before choosing</h2><p>Use these guides to compare interests, then verify availability, platforms and online requirements with the developer or official store. Announced features can change. A recommendation is not a claim of hands-on testing.</p></section></>;
}
