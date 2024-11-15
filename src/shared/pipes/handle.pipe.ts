import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "handle",
  standalone: true,
})
export class HandlePipe implements PipeTransform {
  transform(value: string): string {
    return `@${value}`;
  }
}
