import React from "react";
import { Helmet } from "react-helmet-async";
import { useScrollTop } from "../../hooks";
import Container from "../../components/global/Container";

const Blog = () => {
  useScrollTop();
  return (
    <div className="my-10 py-5">
      <Helmet>
        <title>Blog - Toy Palace</title>
      </Helmet>
      <Container>
        <h1 className="text-3xl font-bold text-gray-900 text-center">Blog</h1>

        <div className="mt-10 space-y-5">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              1. What is an access token and refresh token? How do they work and
              where should we store them on the client-side?
            </h1>
            <p>
              <span className="font-semibold">Answer:</span> Access tokens and
              refresh tokens are credentials used for authentication in web
              applications. An access token grants temporary access to specific
              resources, while a refresh token allows obtaining a new access
              token when it expires. Access tokens are stored securely on the
              client-side, often in memory or as HTTP-only cookies, while
              refresh tokens have longer lifespans and require more secure
              storage measures.
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              2. Compare SQL and NoSQL databases?
            </h1>
            <p>
              <span className="font-semibold">Answer:</span> SQL databases are
              structured with predefined schemas, using tables to store data and
              defining relationships between them. They adhere to ACID
              principles for data integrity. NoSQL databases, on the other hand,
              are non-relational, providing flexibility in data storage and
              scalability. They don't enforce strict schemas and offer high
              performance for handling large amounts of unstructured data.
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              3. What is express js? What is Nest JS?
            </h1>
            <p>
              <span className="font-semibold">Answer:</span> Express.js is a
              popular web application framework for Node.js. It provides a
              minimalistic and flexible approach to building web applications
              and APIs. Express.js offers a range of features for routing,
              middleware handling, and request/response handling. It allows
              developers to quickly create server-side applications with ease
              and is widely used for building RESTful APIs and web servers.
              NestJS, on the other hand, is a progressive Node.js framework
              built with TypeScript. It is designed to enhance the development
              of server-side applications by providing an opinionated and
              scalable architecture. NestJS is heavily inspired by Angular and
              uses decorators, modules, and dependency injection to structure
              the codebase. It offers out-of-the-box support for various
              features such as routing, validation, authentication, and database
              integration. NestJS aims to enable efficient and scalable
              application development with a focus on maintainability and
              extensibility.
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">
              4. What is MongoDB aggregate and how does it work?
            </h1>
            <p>
              <span className="font-semibold">Answer:</span> The MongoDB
              aggregation framework is a feature that allows you to perform
              advanced operations on data stored in MongoDB. It works by
              defining a pipeline of stages through which the data flows,
              enabling tasks such as filtering, grouping, sorting, and
              transforming documents. This powerful tool is commonly used for
              data analysis and generating valuable insights from MongoDB
              collections.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
