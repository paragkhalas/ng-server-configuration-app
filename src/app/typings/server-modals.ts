export interface Server {
    name: string;
    description: string;
    server_ip: string;
    nat_space_id: string;
    server_nat_ip: string;
    status: string;
};

export interface NatSpace {
    id: string;
    name: string;
    server_nat_ip: string;
}

export interface FormServer {
    name: string;
    description: string;
    server_ip: string;
    nat_space_id: string;
    status: string;
};
