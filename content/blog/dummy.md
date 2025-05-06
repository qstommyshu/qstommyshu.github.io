---
title: dummy
description: gRPC introduction is series of blogs for me to output my knowledge for gRPC, and to provide easy to understand tutorial to someone who is interested in learning it. 
author: Tommy Shu
date: 2024-12-15 20:34:00 +0800
categories: [backend]
tags: [gRPC]
pin: true
math: true
mermaid: true
---

gRPC is a modern Remote Procedure Call (RPC) framework released by google since 2016, and it one of most popular high performance communication framework in distributed systems area (blablabla...). This is most of what I found when I try to learn about the topic gRPC. I'm not going to talk about this here, I just want to create a beginner friendly guide to share my knowledge in gRPC.

### What is gRPC?

Right...we still need to let people know some background, but I will try to make it as short as possible. Simply saying, gRPC is a communication framework between two processes (even if these processes are not in the same machine!). It allows one process1 to call a function in process2 as if it is a function in process1, this method of calling function is called Remote Procedure Call ("Procedure" is just another name for function).

Traditionally, this can be done by methods like http request or graphql, but gRPC is just able to do this in a much faster and safer manner.

## Protocol Buffers

When talking about gRPC, Protocol Buffer (Protobuf) is something that can't be skipped. Protobuf is a programming language agnostic method developed by Google to define RPC interface. Protocol Buffer is defined in a file with `.proto` extension, this file describes the structure of your service and data in the RPC communication system. In fact, protocol buffer is both used as an Interface Definition Language (IDL), and underlying message interchagne format in gRPC (just something fun to know about).

Let's start with a simple example to learn about `.proto` file:

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

## Proto File Syntax

The above is a valid example of a `proto` file, and let's take a closer look at its syntax.

### Keywords

- `syntax = "proto3"` means we are using "proto3" syntax for this `.proto` file, and this is the latest version `.proto` file syntax version so far (Dec 2024).
- A `service` is a collection of `rpc`s. And the service name of our example is `rpcExample` (you can name it whatever you want), and there are 4 `rpc`s (function call, basically) under this service, and they are named `UnaryExample`, `ServerStreamExample`, `ClientStreamExample` and `BidirectionalExample`.
- `message` is a self defined RPC communications data structure. Therefore, an `rpc` is very simialr to a function interface in any strongly typed programming language, you need to specific the function name, and input/output type of this function. There are two types of `message` in this `.proto` file: `MyRequest` and `MyResponse`. In `MyRequest`, there is a `string` type field called name, and the `= 1` means `name` is the first field of this `message` . With the same idea, `MyResponse` has two fields, the first field is `name`, it can store value with type `string`. The second field is `content`, and it stores value with type `bytes`.

### Remote Procedure Call

gRPC allows user to define 4 types of RPC: unary RPC, server side streaming RPC, client side streaming RPC and bidirectional RPC. Each type of RPC serve specific purpose.

#### Unary RPC

The `rpc UnaryExample (MyRequest) returns (MyResponse);` is an example of unary RPC, and this line says `UnaryExample` takes in *one* `MyRequest` and return *one* `MyResponse` (just like a function signature in any programming language).

#### Server Side Streaming RPC

The `rpc ServerStreamExample (MyRequest) returns (stream MyResponse);` is an example of server side streaming RPC, this line says `ServerStreamExample` takes in *one* `MyRequest` and return a *stream* of `MyResponse` (imagine data flowing around like a stream/river, that is, a *stream* of `MyResponse` contains multiple `MyResponse` and those `MyResponse` are ordered).

#### Client Side Streaming RPC

The `rpc ClientStreamExample (MyRequest) returns (stream MyResponse);` is an example of client side streaming RPC, takes in a *stream* of `MyRequest` and return *one* `MyResponse`.

#### Bidirectional RPC

The `rpc BidirectionalExample (stream MyRequest) returns (stream MyResponse);` is an example of bidirectional RPC, takes in a *stream* of `MyRequest` and return a *stream* of `MyResponse`.

## End

That's all for the core part of a Protobuf. Very simple, isn't it? I made each part of "gRPC Introduction" very short and simple on purpose, just so reader don't feel overwelmed by gRPC, it is actually not that hard (at least I felt confused when I first look into the official documentation, I think the offical introduction can be made better for newbee to gRPC).

For the next chapter, we are going to learn about how to "use" the `.proto` file we defined to generate interface code and how to implement our gRPC service.