export interface News{
    id: number;
    title: string;
    description: string;
    image: string;
    cicle_id: number;
    cicle_name: string;
    created_at: string;

}

export interface RespuestaTopHeadlines {
    status: string;
    totalResults: number;
    articles: News[];
}