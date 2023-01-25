import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css'

// SSG
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({endpoint: "news", contentId: id});
    const createDate = new Date(Date.parse(data.publishedAt)+32400000)
    .toLocaleDateString('ja-JP')
    .replace(/\//g, '/');

    return {
        props: {
            news: data,
            createDate,
        },
    };
};

export const getStaticPaths = async() => {
    const data = await client.get({endpoint: "news"});
    const paths = data.contents.map((content) => `/news/${content.id}`);

    return {
        paths,
        fallback: false,
    };
};

export default function NewsId({ news, createDate }) {
    return (
        <div className="container">
            <main className={styles.main}>
                <h1 className={styles.title}>{news.title}</h1>
                <p className={styles.publishedAt}>{createDate}</p>
                <div dangerouslySetInnerHTML={{__html: `${news.content}`}} className={styles.post}></div>

                <a className="btn btn-outline-dark btn-sm my-5" href="../#news">戻る</a>
            </main>
        </div>
    )
}