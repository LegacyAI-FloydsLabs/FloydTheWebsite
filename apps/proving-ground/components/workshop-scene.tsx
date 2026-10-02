type Scene = "electronics-workbench" | "morning-bench" | "router-watch";

const scenes = {
  "electronics-workbench": { width: 1200, height: 800, alt: "An imagined Floyd’s Labs electronics bench: a glowing oscilloscope, soldering tools, coffee, and a black cat", note: "002 / THE WORKBENCH", caption: "A useful idea starts here." },
  "morning-bench": { width: 1200, height: 675, alt: "An imagined Indiana garage at dawn, with an open notebook, coffee, and two black cats beside a woodland window", note: "003 / FIRST COFFEE", caption: "Brown County state of mind." },
  "router-watch": { width: 1200, height: 800, alt: "An imagined Bella and Bowser keeping watch over the router and a small server rack in the garage", note: "004 / ROUTER DUTY", caption: "Supervision is non-negotiable." },
};

export function WorkshopScene({ scene, className = "" }: { scene: Scene; className?: string }) {
  const image = scenes[scene];
  return (
    <figure className={`workshop-scene ${className}`} data-scene={scene}>
      <picture>
        <source type="image/webp" srcSet={[480, 800, 1200].map(width => `/brand/scenes/${scene}-${width}.webp ${width}w`).join(", ")} sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1360px) calc((100vw - 80px) / 2), 620px" />
        {/* Pre-encoded variants avoid requiring a hosted image transformation service. */}
        <img src={`/brand/scenes/${scene}-1200.webp`} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />
      </picture>
      <figcaption><span>{image.note}</span><span>{image.caption}</span></figcaption>
    </figure>
  );
}
