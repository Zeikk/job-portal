
export interface IJobOffer {
    title: string,
    href: string,
    company: string,
    location: string,
    source: string,
    date: Date
}

export interface IDataLineChart {
    date: string,
    offers: number
}

export interface IDataBarChart {
    company: string,
    offers: number
}
