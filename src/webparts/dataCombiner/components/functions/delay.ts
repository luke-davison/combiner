// this one I didn't write

export function delay(t: any, v?: any): any {
    return new Promise((resolve: any) => {
        setTimeout(resolve.bind(null, v), t);
    });
}