import { Pipe } from "@angular/core";

@Pipe({
    name:'dataPropertyGetter',
    standalone: true
})
export class DataPropertyGetterPipe{
transform(
    object: any,
    keyName: string,
    ...args: unknown[]
): string | number | null | undefined {
    const value = object[keyName];
    return typeof value ==='string' ||
    typeof value ==='number' ||
    value === null ||
    value === undefined
    ? value
    : null
}
}