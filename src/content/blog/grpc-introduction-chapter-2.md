---
title: gRPC Introduction (Chapter 2)
description: gRPC introduction is series of blogs for me to output my knowledge for gRPC, and to provide easy to understand tutorial to someone who is interested in learning it. 
author: Tommy Shu
date: 2024-12-19 20:34:00 +0800
categories: [backend]
tags: [gRPC]
pin: true
math: true
mermaid: true
---

This chapter of gRPC Introduction covers code implementation of our protobuf defined in [chatper 1](https://qstommyshu.github.io/posts/gRPC-Introduction-(chapter-1)/) in *Type Script*.

## Begin

Let's recap what we learned in [chatper 1](https://qstommyshu.github.io/posts/gRPC-Introduction-(chapter-1)/#protocol-buffers). We've created an example protobuf below:

```proto
syntax = "proto3";

service rpcExample {
    rpc UnaryExample (MyRequest) returns (MyResponse);

    rpc ServerStreamExample (MyRequest) returns (stream MyResponse);

    rpc ClientStreamExample (stream MyRequest) returns (MyResponse);

    rpc BidirectionalExample (stream MyRequest) returns (stream MyResponse);
}

message MyRequest {
    string name = 1;
}

message MyResponse {
    string name = 1;
    bytes content = 2;
}
```

This `.proto` file defines the interface of a gRPC service `rpcExample`. We can use this protobuf to generate code set up and structures that is irrelvant to our Remote Procedure Call (RPC) logic, such as: setting up client and server connection, binding to specific port, etc...

## Project Set Up

For this example, I'm going to use Type Script to demostrate gRPC code implementaion, as Type Script is easy and forgiving (than C++), while still have compilation check (yes, I'm talking about Python). All the code used in this example can be found under this [GitHub Repo](https://github.com/qstommyshu/grpc-ts-example).

### Create Project Directory

To get started with this project, you need `npm`, `yarn`, `protoc` installed.

1\. Create a directory named `grpc-ts-example`, and initialize it as a Type Script yarn project with necessary packages by running the command below in terminal:

```shell
mkdir grpc-ts-example
cd grpc-ts-example
yarn init -y
yarn add typescript ts-node @types/node --dev ts-proto @grpc/grpc-js
npx tsc --init
```

2\. Create a file called `rpc_example.proto` and paste in our protobuf content:

```shell
echo 'syntax = "proto3";

service rpcExample {
    rpc UnaryExample (MyRequest) returns (MyResponse);

    rpc ServerStreamExample (MyRequest) returns (stream MyResponse);

    rpc ClientStreamExample (stream MyRequest) returns (MyResponse);

    rpc BidirectionalExample (stream MyRequest) returns (stream MyResponse);
}

message MyRequest {
    int32 id = 1;
    string msg = 2;
}

message MyResponse {
    string msg = 1;
}' > rpc_example.proto
```

3\. Then add some useful scripts to `package.json`:

```shell
npm pkg set scripts.proto:build="protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./generated ./rpc_example.proto --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true"
npm pkg set scripts.server="npx ts-node src/server.ts"
npm pkg set scripts.client:unary="npx ts-node src/client/unaryExample.ts"
npm pkg set scripts.client:server-stream="npx ts-node src/client/serverStreamExample.ts"
npm pkg set scripts.client:client-stream="npx ts-node src/client/clientStreamExample.ts"
npm pkg set scripts.client:bidirectional="npx ts-node src/client/bidirectionalExample.ts"
```

### Interface Generation

Create a directory called `generated` (meaning code in this directory are generated), and generate Type Script interface:

```shell
mkdir generated
yarn run proto:build
```

You should see `rpc_example.ts` being generated in the `generated` directory after executing the above command. And there should be around 300 lines of scary code in the generated file. But take a deep breath and calm down, at least we don't need to write this code, we only need to use a small part of it.

## RPC Implementation

Before starting the RPC code implementation, we need to create a directory called `src` to store all our implementation code, and create files for server an clients:

```shell
mkdir src
touch src/server.ts
mkdir src/client
touch src/client/unaryExample.ts
touch src/client/serverStreamExample.ts
touch src/client/clientStreamExample.ts
touch src/client/bidirectionalExample.ts
```

The `server.ts` holds the code for server, and each file under the `client` directory holds client code for a type of RPC example (out of the [4 types of RPC](https://qstommyshu.github.io/posts/gRPC-Introduction-(chapter-1)/#remote-procedure-call)).
To mention, the code practice in from this blog is definitly not the best, as the [repo](https://github.com/qstommyshu/grpc-ts-example) is for educational purpose, the goal here is to make everything clear and easy to understand.

### Server Set Up

To start a gRPC server, we need to create a new server instance, add service to our server (yes, the service we defined in `.proto` file), and then add some credentials to our server.

```typescript
import {
  Server,
  ServerCredentials,
  sendUnaryData,
  ServerUnaryCall,
  ServerWritableStream,
  ServerReadableStream,
  ServerDuplexStream,
} from "@grpc/grpc-js";
import {
  MyRequest,
  MyResponse,
  rpcExampleService,
} from "../generated/rpc_example";

// Initialize the gRPC server and bind the RPC services.
const server = new Server();
server.addService(rpcExampleService, {
  // we need to define them
  unaryExample,
  serverStreamExample,
  clientStreamExample,
  bidirectionalExample,
});

// Start the server on the specified address.
server.bindAsync("localhost:12138", ServerCredentials.createInsecure(), () => {
  console.log("[Server] Running at http://localhost:12138");
});
```

The second parameter of `server.addService()` is an object with the service RPC implementation fields. Therefore, for this code to be valid, we still need to *define* and *implement* those functions. Let's get started then!

### Unary RPC Example

Let's get started with the `unaryExample`. Unary RPC means client sends 1 request and server will response with 1 response.

#### Unary RPC Example (Server)

Talk is cheap, I'll show you the code (for `unaryExample`):

```typescript
// Unary RPC example: Handles a single request and sends a single response.
const unaryExample = (
  call: ServerUnaryCall<MyRequest, MyResponse>,
  callback: sendUnaryData<MyResponse>
) => {
  const request = call.request;
  console.log("[Server] Unary RPC request received: ", request.msg);

  const result: MyResponse = {
    msg: "server response-unary example",
  };

  callback(null, result);
  console.log("[Server] Unary RPC response sent.");
};
```

The `unaryExample` function takes in a call with type `ServerUnaryCall` and a callback with type `sendUnaryData`, the call is basically the remote procedure "call" from the client. And the callback is the way the server "send unary data" back to the client.

#### Unary RPC Example (Client)

And the client implementation for `unaryExample` is below:

```typescript
import { credentials } from "@grpc/grpc-js";
import { MyRequest, rpcExampleClient } from "../../generated/rpc_example";

const client = new rpcExampleClient(
  "localhost:12138",
  credentials.createInsecure()
);

const unaryRequest: MyRequest = {
  id: 1,
  msg: "This is a unary RPC request message from client!",
};

client.unaryExample(unaryRequest, (err, response) => {
  if (err) {
    console.error(`[Client] unary RPC error: ${err}`);
  } else {
    console.log(`[Client] unary RPC response received: ${response.msg}`);
  }
});

console.log("[Client] unary RPC example done");
```

First, we need to set up a our gRPC client (similar but less step than server setup). Then, we just call `client.unaryExample(unaryRequest, func)` with our request and a function of how we want to do about our response (just like calling a simple function! That's it!).

You can test it out by cloning the github repo and run `yarn run server` to start the server and `yarn run client:unary` to test out the client! It is similar if you want to test out other examples.

### Server Side Streaming RPC Example

Server side streaming RPC means client sends 1 request and server will response with multiple responses (1 or more). For example, if a client wants to request a file from the server, it needs to send a request containing the name of the file it wants, and server will reponse with multiple file chuncks that can be assembled into 1 file on the client side.

#### Server Side Streaming RPC Example (Server)

Here is the `serverStreamExample`:

```typescript
// Server-side streaming RPC example: Sends multiple responses for a single request.
const serverStreamExample = (
  stream: ServerWritableStream<MyRequest, MyResponse>
) => {
  console.log(
    "[Server] Server-side stream RPC request received: ",
    stream.request.msg
  );

  for (let i = 0; i < 5; i++) {
    // Send a response every 1 second.
    setTimeout(() => {
      const response = { msg: `server response #${i}-server stream example` };
      stream.write(response);
    }, i * 1000);
  }

  // End the stream after all responses are sent, with a 1-second buffer.
  setTimeout(() => {
    stream.end();
    console.log("[Server] Server-side stream ended.");
  }, 6000);
};
```

This function takes in a `ServerWritableStream<MyRequest, MyResponse>`, in this stream, we can get the request message from `stream.request.msg`. After receving the request, we can preform our logic based on the request we received. In this example, we just send hard coded response back to the client with `stream.write(response)` every 1 second (just to show what you can do with the stream). Then end the stream after all the responses are sent.

#### Server Side Streaming RPC Example (Client)

Below section has the code for client:

```typescript
import { ServiceError, credentials, ClientReadableStream } from "@grpc/grpc-js";
import {
  MyRequest,
  MyResponse,
  rpcExampleClient,
} from "../../generated/rpc_example";

const client = new rpcExampleClient(
  "localhost:12138",
  credentials.createInsecure()
);

const request: MyRequest = {
  id: 1,
  msg: "This is a server side stream RPC request message from client!",
};

const stream: ClientReadableStream<MyResponse> =
  client.serverStreamExample(request);

let count = 0;
console.log(`[Client] receiving server side stream: `);

stream.on("data", (response: MyResponse) => {
  console.log(`[Client] received: ${response.msg}`);
  count += 1;
});

stream.on("end", () => {
  console.log(`[Client] All ${count} responses received!`);
  console.log("[Client] Server-side stream ended.");
});

stream.on("error", (err: ServiceError) => {
  console.error("[Client] Stream error:", err);
});

// get stream status after finishing the RPC
stream.on("status", (status) => {
  console.log("[Client] Status received:", status);
});
```

The client calls the `serverStreamExample(request)` with a self defined request, and `serverStreamExample(request)` returns a `ClientReadableStream<MyResponse>` (I read it as a `ClientReadableStream` make by `MyResponse`) stream object. The client needs to set what they want to do with the stream, like `stream.on("data", func)` means when there is a data send through stream, the code will perform logics defined in `func`. Similarly, we need to define `stream.on("end", func)` for action when the stream closes, and `stream.on("error", func)` for when an error occurs in the stream, and `stream.on("status", func)` for when we receive the status for this stream communication after the stream is closed.

### Client Side Streaming RPC Example

With similar idea, client side streaming RPC is client multiple requests, and server will respond to the client with 1 response. For example, when client wants to store a file on server, the client needs to break a file into multiple parts and send to the server, server then response with a status indicating if the file has been successfully stored.

#### Client Side Streaming RPC Example (Server)

As usual, here is the server code:

```typescript
// Client-side streaming RPC example: Receives multiple requests and sends a single response.
const clientStreamExample = (
  stream: ServerReadableStream<MyRequest, MyResponse>,
  callback: sendUnaryData<MyResponse>
) => {
  console.log("[Server] Client-side stream RPC request received.");

  let count = 0;
  stream.on("data", (request: MyRequest) => {
    console.log(`[Server] Received client stream request: ${request.msg}`);
    count++;
  });

  stream.on("end", () => {
    console.log(`[Server] All ${count} client stream requests received.`);
    const response: MyResponse = {
      msg: "server response: client stream example",
    };
    callback(null, response);
    console.log("[Server] Client stream response sent.");
  });
};
```

The `clientStreamExample` function takes in a stream `ServerReadableStream<MyRequest, MyResponse>` and a callback `sendUnaryData<MyResponse>`. Here the server sends a response back to the client when we received all client requests in `stream.on("end", func)`.

#### Client Side Streaming RPC Example (Client)

client code:

```typescript
import { credentials, ClientWritableStream } from "@grpc/grpc-js";
import { MyRequest, rpcExampleClient } from "../../generated/rpc_example";

const client = new rpcExampleClient(
  "localhost:12138",
  credentials.createInsecure()
);

const stream: ClientWritableStream<MyRequest> = client.clientStreamExample(
  (error, response) => {
    if (error) {
      console.error(`[Client] client side stream RPC error: ${error}`);
    } else {
      console.log(
        `[Client] client side stream RPC response received: ${response.msg}`
      );
    }
  }
);

// no stream.on("data") because server response is not send through stream in this case

stream.on("error", (err: Error) => {
  console.error(`[Client] stream error: ${err}`);
});

stream.on("status", (status) => {
  console.log("Status received:", status);
});

console.log(`[Client] sending requests...`);
for (let i = 0; i < 5; i++) {
  // send a response every 1 sec
  setTimeout(() => {
    const request: MyRequest = { id: i, msg: `client stream request #${i}` };
    stream.write(request);
  }, i * 1000);
}

// end the stream after all response are sent, leave 1 sec as buffer time
setTimeout(() => {
  stream.end();
}, 6000);
```

Here the client calls `client.clientStreamExample(func)` and gets a `ClientWritableStream<MyRequest>` (reads `ClientWritable` stream made by `MyRequest`, so client will need to use `stream.write(request)` to send requests to server). And the client receives the response from the server in the function we passed to `client.clientStreamExample(func)`, and perform some logics when receiving the response. Similar to how we deal with other stream, we need to define different operations on different stream stage. However, we don't have `stream.on("data", func)` here because the response is handled in `client.clientStreamExample(func)`.

> One thing to note is the server interface for `serverStreamExample` and `clientStreamExample` are a little different. In `serverStreamExample`, the server both read and write data with a single stream. However, in `clientStreamExample`, the server read requests from a stream, and send response with a callback. This might leads to confusion. My understanding is: the stream in `serverStreamExample` is a `ServerWritableStream`, and stream in `clientStreamExample` is `ServerReadableStream`. Any type of stream can receve data, but only "WritableStream" can be used to send data. That's why the server interface between them is a little different (the stream they use are different!).
{: .prompt-tip }

### Bidirectional RPC Example

Last but not least, bidirectional RPC Example is that both the client and server sends a stream to each other. The order of the stream data various depends on specific implementation of the RPC. Imagine this as the client is chatting with the server in Snap Chat, they can send messages to each other in turn-based communication, or one can send multiple messages and the other responses with multiple messages...how they communicate is all up to them. And here comes a real life example of bidirectional RPC is chat app, it can be used as underneath mechnism of a chat app where multiple people communicates.

#### Bidirectional RPC Example (Server)

Here we go for the server code:

```typescript
// Bidirectional streaming RPC example: Handles a two-way stream of requests and responses.
const bidirectionalExample = (
  stream: ServerDuplexStream<MyRequest, MyResponse>
) => {
  console.log("[Server] Bidirectional stream RPC started.");

  let count = 0;
  let sent = 0;
  stream.on("data", (request: MyRequest) => {
    console.log(
      `[Server] Received bidirectional stream request with id:${request.id}`
    );
    count++;

    const response = {
      msg: `server response #${count}-bidirectional example`,
    };
    // send response 0.5 sec after receiving request
    setTimeout(() => {
      stream.write(response);
      sent++;
    }, 500);
  });

  stream.on("end", () => {
    console.log(
      `[Server] All ${count} bidirectional stream requests received.`
    );
    console.log("[Server] Bidirectional stream ended.");
    stream.end();
  });

  stream.on("error", (err: Error) => {
    console.error("[Server] Bidirectional stream error:", err);
  });

  stream.on("status", (status) => {
    console.log("[Server] Status received:", status);
  });
};
```

The stream in this example is in type `ServerDuplexStream<MyRequest, MyResponse>` (I read it as a channel that both side can send messages in `MyRequest` and `MyResponse`). In this example, the server response to every request one the server receives it, with a 0.5 second delay (just to show you request and response can be in any order, just up to how client and server are implemented). You should be able to get a hang of it after previous examples, right?

#### Bidirectional RPC Example (Client)

Here we go, our last code example!

```typescript
import { credentials, ClientDuplexStream } from "@grpc/grpc-js";
import {
  MyRequest,
  MyResponse,
  rpcExampleClient,
} from "../../generated/rpc_example";

const client = new rpcExampleClient(
  "localhost:12138",
  credentials.createInsecure()
);

const stream: ClientDuplexStream<MyRequest, MyResponse> =
  client.bidirectionalExample();

stream.on("data", (response: MyResponse) => {
  console.log(`Received response from server: ${response.msg}`);
});

stream.on("error", (err: Error) => {
  console.error("Stream error:", err);
});

stream.on("status", (status) => {
  console.log("Status received:", status);
});

for (let i = 0; i < 5; i++) {
  // send a response every 1 sec
  setTimeout(() => {
    const request: MyRequest = {
      id: i,
      msg: `bidirectional stream request #${i}`,
    };
    stream.write(request);
  }, i * 1000);
}

// end the stream after all response are sent, leave 1 sec as buffer time
setTimeout(() => {
  stream.end();
}, 6000);
```

Here the client calls `client.bidirectionalExample()` to get a `ClientDuplexStream<MyRequest, MyResponse>` stream object, and defines operation on different stream stages, then start sending requests.

## End

That's all for the gRPC code implementation. There are quite some code in this example, but their ideas are similar, hope you understand it after all these examples (google really made efforts to make gRPC easy to use).

For the next chapter, we are going to learn about fine tuning technics in gRPC.
