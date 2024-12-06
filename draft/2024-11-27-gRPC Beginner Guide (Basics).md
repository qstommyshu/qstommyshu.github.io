---
title: gRPC Introduction (Chapter 1)
description: The first chapter of gRPC Introduction, this article covers protocol buffers, 4 types of RPC, and C++ code implementation.
author: 
date: 2024-11-27 20:34:00 +0800
categories: [Blogging]
tags: [GRPC]
pin: true
math: true
mermaid: true
---

## gRPC Beginner Guide (Chapter 1)

gRPC is a modern Remote Procedure Call (RPC) framework released by google since 2016, and it one of most popular high performance communication framework in distributed systems area (blablabla...). This is most of what I found when I try to learn about the topic gRPC. I'm not going to talk about this here, I just want to create a beginner friendly guide to share my knowledge in gRPC.

### What is gRPC?

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
    string name = 1;
    bytes content = 2;
}
```

Let's take a closer look core part of the file.

## Proto File Syntax

### Keywords

- `syntax = "proto3"` means we are using "proto3" syntax for this `.proto` file, and this is the latest version `.proto` file syntax version so far (Nov 2024).
- The service name is `MyService` (you can name it whatever you want), and there are 4 RPC (function call, basically) under this service, and they are named `UnaryExample`, `ServerStreamExample`, `ClientStreamExample` and `BidirectionalExample`.
- There are two types of `message` in this `.proto` file: `MyRequest` and `MyResponse`. These are self defined data structure for RPCs, just like input type/output type of a function in any programming language. In `MyRequest`, there is a `string` type field called name, and the `= 1` means `name` is the first field of this `message` (this `= ${number}` can only appear once in  a message). With the same idea, `MyResponse` has two fields, the first field is `name`, it can store value with type `string`. The second field is `content`, and it stores value with type `bytes`.

### Remote Procedure Call

gRPC allows user to define 4 types of RPC: unary RPC, server side streaming RPC, client side streaming RPC and bidirectional RPC.

#### Unary RPC

The `rpc UnaryExample (MyRequest) returns (MyResponse);` is an example of unary RPC (yeah, that's how I named them), and this line says `UnaryExample` takes in *one* `MyRequest` and return *one* `MyResponse` (so this is function signature, just like in any programming language).

#### Server Side Streaming RPC

The `rpc ServerStreamExample (MyRequest) returns (stream MyResponse);` is an example of server side streaming RPC, this line says `ServerStreamExample` takes in *one* `MyRequest` and return a *stream* of `MyResponse` (imagine data flowing around like a real life stream, that is, a *stream* of `MyResponse` contains multiple `MyResponse` and those `MyResponse` are ordered).

#### Client Side Streaming RPC

The `rpc ClientStreamExample (MyRequest) returns (stream MyResponse);` is an example of client side streaming RPC, takes in a *stream* of `MyRequest` and return *one* `MyResponse`.

#### Bidirectional RPC

The `rpc BidirectionalExample (stream MyRequest) returns (stream MyResponse);` is an example of bidirectional RPC, takes in a *stream* of `MyRequest` and return a *stream* of `MyResponse`.

## RPC Code Implementation

I like Python, it is simple and forgiving, but I think Python hides a lot of things we should know in gRPC, so I think it is better to use C++ to introduce gRPC code Implementation. Before we really gets into code, we need to know how to use `.proto` file and what a `.proto` file actually does.

<!-- TODO: try c++ code example and add to a github repo -->


## Useful tips in gRPC
### Empty
### Deadlines
### `oneof`
### Cancelling an RPC