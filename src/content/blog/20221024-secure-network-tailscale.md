---
title: "Tip: Secure your internet for free with Tailscale"
pubDate: "2022-10-24"
description: "Use tailscale to route your internet through a secure tunnel to an exit node that you control"
longDescription: "Article teaching how to use Tailscale to route your internet through a secure tunnel you own to secure your connection."
coverImg: "/images/blog/20221024-secure-network-tailscale/pexels-pixabay-159304.jpg"
coverAlt: "White switch hub turned on with cables connected to it"
---

> Disclaimer: I am not sponsored, I only want to share my experience with this tool/service for this use case.

> This is a short tutorial as most of the information is provided by the Tailscale website as a way of preventing future out-of-date documentation.

## What is Tailscale

[Tailscale](https://tailscale.com/) is a service that provides a VPN: in the literal term of the word, they provide a [mesh network](https://en.wikipedia.org/wiki/Mesh_networking) on which you can connect all your devices in a secure way.

If you are familiar with Hamachi, [it is similar to it](https://tailscale.com/blog/hamachi/), but on steroids.

## The idea of the setup

I get online from my phone a lot, from multiple Wi-Fi cafes and mobile data antennas.
If an app or a website happens to reach the network insecurely, I am exposed.

On this setup, you will need at least two devices, one that you will act as an exit node (that is connected to your home internet), and the others will be the clients.

In my particular use case, I am using a Linux virtual machine that is running on my desktop PC to act as an exit node, and my Android mobile phone as a client.

But you can use any kind of device!

## Setting up the exit node

Head over to [Tailscale downloads page](https://tailscale.com/download/), you can switch between tabs to select the operative system your device runs.

Once installed, you can refer to their guide on [how to run an exit node](https://tailscale.com/kb/1103/exit-nodes).

## Setting up the client

Once you install the app on your device and log in, you can use the option "Use exit node" to connect to it.

## Conclusion

There you have it: secure internet, anywhere you go, with no speed limitations, as long as you keep the exit-node device on.

Take care.
