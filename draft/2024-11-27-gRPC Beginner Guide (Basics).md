---
title: gRPC Beginner Guide (Basics)
description: Examples of text, typography, math equations, diagrams, flowcharts, pictures, videos, and more.
author: Tommy
date: 2024-11-27 20:34:00 +0800
categories: [Blogging]
tags: [GRPC]
pin: true
math: true
mermaid: true
---

# gRPC Beginner Guide (Basics)

gRPC is a modern Remote Procedure Call (RPC) framework released by google since 2016, and it one of most popular high performance communication framework in distributed systems area (blablabla...). This is most of what I found when I try to learn about the topic gRPC. I'm not going to talk about this here, I just want to create a beginner friendly guide to share my knowledge in gRPC.

## Protocol Buffers
When talking about gRPC, Protocol Buffer is something that can't be skipped. Protocol Buffer is a file with `.proto` extension, that defines the structure of your service and data in the RPC communication system. Let's start with a simple example to learn about `.proto` file:

Say there is a cool website where you can download your favourite vidoe from (just like youtube). The website has a server, and your computer is the client. Inorder to support the communication between the client and the server, there are some "service"s the webiste needs to provide: 

1. A method allows client to get the information of a video.
2. A method allows client to download a video.
3. A method allows content creator to upload a video.
4. A method allows client to download multiple videos (this is something a video savvy like me would want).

Below would be an example `.proto` (not complete) file defines such a service.

```
syntax = "proto3";

package video_service;

service VideoService {
    rpc GetVideoInfo (VideoInfoRequest) returns (VideoInfoResponse);

    rpc DownloadVideo (DownloadVideoRequest) returns (stream DownloadVideoResponse);

    rpc UploadVideo (stream UploadVideoRequest) returns (UploadVideoResponse);

    rpc DownloadMultipleVideos (stream DownloadVideoRequest) returns (stream DownloadVideoResponse);
}
```

Let's take a closer look core part of the file. 
- `syntax = "proto3"` means we are using "proto3" syntax for this `.proto` file, and this is the latest version `.proto` file syntax version so far (Nov 2024).
- The service name is `VideoService`, and there are 4 rpc under this service, and they are named `GetVideoInfo`, `DownloadVideo`, `UploadVideo` and `DownloadMultipleVideos`.
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

