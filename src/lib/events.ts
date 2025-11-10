type Handler = (evt: MessageEvent<any>) => void;

export function connectEvents(opts: {
  tenant: string;
  onCaseNew?: (p: any) => void;
  onStatsUpdate?: (p: any) => void;
  onHello?: () => void;
  onPing?: () => void;
}) {
  const url = new URL(`${import.meta.env.VITE_API_BASE ?? ""}/api/events`);
  url.searchParams.set("tenant", opts.tenant);

  const es = new EventSource(url.toString(), { withCredentials: false });

  es.addEventListener("hello", () => opts.onHello?.());
  es.addEventListener("ping",  () => opts.onPing?.());

  es.addEventListener("case:new", ((e) => {
    const data = JSON.parse((e as MessageEvent).data);
    opts.onCaseNew?.(data);
  }) as Handler);

  es.addEventListener("stats:update", ((e) => {
    const data = JSON.parse((e as MessageEvent).data);
    opts.onStatsUpdate?.(data);
  }) as Handler);

  return () => es.close();
}
