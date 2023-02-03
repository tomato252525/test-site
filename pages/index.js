import Head from 'next/head'
import { Inter } from '@next/font/google'
import { client } from "@/libs/client";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useRef } from "react";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Card, ListGroup } from 'react-bootstrap';

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async() => {
  const offset = 0;
    const limit = 100;
    const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: "news", queries: queries });
  const createDate = data.contents.map((content) => 
    new Date(Date.parse(content.publishedAt)+32400000)
    .toLocaleDateString('ja-JP')
    .replace(/\//g, '/')
  );

  return {
    props: {
      news: data.contents,
      createDate,
    },
  };
};

export default function Home({ news, createDate }) {
  var i = 0;
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let name = nameRef.current?.value;
    if (name == "") {
      name = "名無し";
    }

    let data = {
      name: name,
      address: addressRef.current?.value,
      message: messageRef.current?.value,
    }

    await fetch("api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        messageRef.current.value = "送信しました。";
        console.log("メール送信成功");
      };
    });
  };
  return (
    <>
      <Head>
        <title>beauty salon site</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar variant="dark" collapseOnSelect expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">beauty salon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#news" className="px-3">News</Nav.Link>
              <Nav.Link href="#menu" className="px-3">Menu</Nav.Link>
              <Nav.Link href="#catalog" className="px-3">Catalog</Nav.Link>
              <Nav.Link href="#reserve" className="px-3">Reserve</Nav.Link>
              <Nav.Link href="#access" className="px-3">Access</Nav.Link>
            </Nav>
            <div className="ps-5 text-end">
              <a className="tel" href="tel:000-000-0000">000-000-0000</a>
              <span className="d-block hours">OPEN 9:30-20:00</span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <header className="header-img" id="home">
        <div className="vh-100 text-center text-white d-flex">
          <div className="container my-auto">
            <p className="top-message">Welcome page.</p>
            <p className="lead m-5">
              This page is sample.
            </p>
            <p className="lead">
              <a className="btn btn-success p-3 text-white" href="#reserve">
                Make reservation
              </a>
            </p>
          </div>
        </div>
      </header>
      <main>
        <div className="max-vh-100 py-5 text-center" id="news">
          <h1 className="py-5 fw-bold">NEWS</h1>
          <ul className="list-group news-w mx-auto pb-5">
            { news.map((news) => (
              <a key={news.id} href={`news/${news.id}`} className="list-group-item list-group-item-action list d-flex justify-content-between">
                <div>{news.title}</div>
                <div>{createDate[i++]}</div>
              </a>
            ))}
          </ul>
        </div>
        <div className="py-5 text-center text-white bg-secondary" id="menu">
          <h1 className="py-5 fw-bold">MENU</h1>
          <div className="d-lg-flex mx-auto pb-5 menu-w">
            <div className="list-w">
              <h2 className="pb-3 fw-bold">CUT</h2>
              <ListGroup variant="flush" className="bg-none">
                <ListGroup.Item className="d-flex justify-content-between bg-none">
                  <p>カット</p>
                  <p>¥4000</p>
                </ListGroup.Item>
                <ListGroup.Item  className="d-flex justify-content-between">
                  <p>スクールカット</p>
                  <p>¥3500</p>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="list-w">
              <h2 className="pb-3 fw-bold">COLOR</h2>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <p>シングルカラー</p>
                  <p>¥4000</p>
                </ListGroup.Item>
                <ListGroup.Item  className="d-flex justify-content-between">
                  <p>イルミナカラー</p>
                  <p>¥3500</p>
                </ListGroup.Item>
                <ListGroup.Item  className="d-flex justify-content-between">
                  <p>オーガニックカラー</p>
                  <p>¥3500</p>
                </ListGroup.Item>
                <ListGroup.Item  className="d-flex justify-content-between">
                  <p>バレイヤージュカラー</p>
                  <p>¥3500</p>
                </ListGroup.Item>
                <ListGroup.Item  className="d-flex justify-content-between">
                  <p>ホイルウィービング５枚~</p>
                  <p>¥3500</p>
                </ListGroup.Item>
                <ListGroup.Item  className="d-flex justify-content-between">
                  <p>グラデーションカラー</p>
                  <p>¥3500</p>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="list-w">
              <h2 className="pb-3 fw-bold">PERM</h2>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <p>ナチュラルウェーブ</p>
                  <p>¥4000</p>
                </ListGroup.Item>
                <ListGroup.Item  className="d-flex justify-content-between">
                  <p>デジタルパーマ</p>
                  <p>¥3500</p>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
        <div className="min-vh-100 py-5 text-center bg-dark" id="catalog">
          <h1 className="py-5 fw-bold text-white">CATALOG</h1>
          <div className="d-lg-flex mx-auto catalog-w">
            <Card>
              <Card.Img variant="top" src="/catalog-sample.jpg/" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the cards content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src="/catalog-sample2.jpg/" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the cards content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src="/catalog-sample3.jpg/" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the cards content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <a className="btn btn-success p-3 my-5 text-white" href="./catalog">
            View More
          </a>
        </div>
        <div className="vh-100 py-5 text-white bg-secondary" id="reserve">
          <h1 className="py-5 fw-bold text-center">RESERVE</h1>
          <div className="w-50 mx-auto">
            <form className="w-100 text-center" onSubmit={(e) => handleSubmit(e)}>
              <a className="tel d-inline-block bg-dark p-3 mb-3" href="tel:000-000-0000">電話予約：000-000-0000</a>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">お名前</label>
                <input type="text" className="form-control" id="name" ref={nameRef} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">メールアドレス</label>
                <input type="email" className="form-control" id="email" ref={addressRef} required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">内容 (送信完了時に内容が「送信しました。」と変更されます)</label>
                <textarea name="message" id="message" className="form-control" ref={messageRef} required></textarea>
              </div>
              <button type="submit" className="btn btn-danger mb-5 w-25 text-center">送信</button>
            </form>
          </div>
        </div>
        <div className="vh-100" id="access">
          
        </div>
      </main>
      <footer>
        
      </footer>

    </>
  )
}
