export interface Log {
    _id: {
        $oid: string;
    };
    timestamp: string;
    level: string;
    message: string;
    metadata: any;
    };