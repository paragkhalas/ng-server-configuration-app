import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'serverFilter' })
export class FilterServerPipe implements PipeTransform {

    transform(servers: any[], searchTerm: string): any[] {
        if (!servers) {
            return [];
        }
        if (!searchTerm) {
            return servers;
        }
        searchTerm = searchTerm.toLowerCase();

        return servers.filter(server => {
            return server.name.toLowerCase().includes(searchTerm);
        });
    }
}