import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterSelection' })
export class FilterSelectionPipe implements PipeTransform {

    transform(selectionList: any[], server: string) {
        if (!selectionList) {
            return [];
        }
        if (!server) {
            return selectionList;
        }
        server = server.toLowerCase();

        const filteredList = selectionList.filter(name => {
            return name.toLowerCase().includes(server);
        });

        return filteredList.length ? false : true;
    }
}