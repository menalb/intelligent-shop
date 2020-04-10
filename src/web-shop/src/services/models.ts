//export type foundState<TItem> = TItem[] | "init" | "loading" | "error";
export type searchResponseStatus<TItem> = {
    status: 'init' | 'loading' | 'error';
} | {
    status: 'loaded',
    result: TItem[]
}