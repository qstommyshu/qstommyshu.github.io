---
title: gRPC Beginner Guide (Chapter 1)
description: Examples of text, typography, math equations, diagrams, flowcharts, pictures, videos, and more.
author: Tommy
date: 2024-11-27 20:34:00 +0800
categories: [Blogging]
tags: [GRPC]
pin: true
math: true
mermaid: true
---

# gRPC Beginner Guide (Chapter 1)

gRPC is a modern Remote Procedure Call (RPC) framework released by google since 2016, and it one of most popular high performance communication framework in distributed systems area (blablabla...). This is most of what I found when I try to learn about the topic gRPC. I'm not going to talk about this here, I just want to create a beginner friendly guide to share my knowledge in gRPC.

## What is gRPC?

Right...we still need to let people know some background, but I will try to make it as short as possible. Simply saying, gRPC is a communication framework between two processes (even if these processes are not in the same machine!). It allows one process1 to call a function in process2 as if it is a function in process1, this method of calling function is called Remote Procedure Call ("Procedure" is just another name for function).

Traditionally, this can be done by methods like http request or graphql, but gRPC is just able to do this in a much faster and safer manner.

## Protocol Buffers

When talking about gRPC, Protocol Buffer is something that can't be skipped. Protocol Buffer is a file with `.proto` extension, that defines the structure of your service and data in the RPC communication system. Let's start with a simple example to learn about `.proto` file:

```proto
syntax = "proto3";

service MyService {
    rpc UnaryExample (MyRequest) returns (MyResponse);

    rpc ServerStreamExample (MyRequest) returns (stream MyResponse);

    rpc ClientStreamExample (stream MyRequest) returns (MyResponse);

    rpc BidirectionalExample (stream MyRequest) returns (stream MyResponse);
}

message MyRequest {
    string name = 1;
}

message MyResponse {
    bytes content = 1;
    int32 size = 2;
}
```

Let's take a closer look core part of the file.

- `syntax = "proto3"` means we are using "proto3" syntax for this `.proto` file, and this is the latest version `.proto` file syntax version so far (Nov 2024).
- The service name is `MyService` (you can name it whatever you want), and there are 4 rpc under this service, and they are named `UnaryExample`, `ServerStreamExample`, `ClientStreamExample` and `BidirectionalExample`.
- If a client wants to call `GetVideoInfo`, the client will send a `DownloadVideoRequest` to the server, and the server will response with a "stream" of `DownloadVideoResponse`.
    <!-- TODO: change stream methaphor -->
    ("stream" here can simply be interpret as physical "stream". Imagine a video file is divided into multiple little chunks, and flow to the client like a stream. Keep in mind, a stream has order. You can also interpret stream as a file queue. )
- If a client wants to call `UploadVideo`, the client will send a `UploadVideoRequest` stream to the server, and the server will response with a `UploadVideoResponse`.
- If a client wants to download multiple videos, it needs to call `DownloadMultipleVideos` with a `DownloadVideoRequest` stream, and server will return a `DownloadVideoResponse` stream.

#### Keywords

## gRPC service methods:
### Unary RPC
### Server Streaming RPC
### Client Streaming RPC
### Bidirectional RPC

## Useful tips in gRPC
### Empty
### Deadlines
### `oneof`
### Cancelling an RPC