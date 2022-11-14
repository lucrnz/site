+++
title = "Home"
date = 2022-11-09
description = "How I feel about having everything on my domain name"
+++

There is no place like home, right? That is how I am feeling right now.

Recently, I migrated both my e-mail account and my fediverse microblog to be on my domain name.

## Migrating e-mail



I have been a user of ProtonMail, due to privacy concerns with other providers I just went with that option.

It was fine, but I was using their domain name, which is really trusted.

~~Now, I am paying Google to take care of it, using the lowest tier (that is $6 at the time of writing).~~

> Update (2022 11 14): After reviewing the Google Workspace plan, I never actually payed, I started with a trial plan. Apparently the price is per user, as you now I am plural, I need addresses for my alters so I decided to upgrade to Proton Mail Plus plan. Now I can use Migrating the e-mail was easy as just updating registers in the domain names.

~~Why go for the big G? I am really scared of being flagged as spam. As I know, there are multiple providers that keep their reputation, and you probably should give it a try! But I wanted to be fully safe this time.

~~Is someone spying on us over e-mail? Well, we should use GPG or do business in another place. (**cough Matrix ?**)~~

The technical setup was a breeze, I realized my VPS provider (that is Contabo) has a really bad domain DNS panel, so I had to migrate nameservers to my current registrar (that is GoDaddy).

After setting up all the MX entries, and waiting for Google to catch up on the update, I decided that it was a perfect time to set up and force myself to learn GPG.

In the process of updating my DNS entries, I found out that I have not added the IPv6 (AAAA) entries for my website (I took care of that as well).

GPG keys setup was fairly easy, although I had to fire up my NixOS vm because,  Arch Linux ships an older version of GPG, and the command to generate the keys was recommending to use old algorithms (it is probably fine, I just wanted the latest stuff).

[This article](https://www.jwillikers.com/backup-and-restore-a-gpg-key) helped me to save my GPG key inside my KeePass database, in case my computer turns into fire, I do not lose it. 

~~After 3 hours, (literally), Google detected the DNS changes and I was able to use GMail, with my cute avatar on top of the Google logo. (they think I am a company! Foolish of them)~~

## Migrating my fediverse account to my VPS

Unfortunately, there is no magic way of doing it, I had to rely of my followers wanting to follow me back again.

The only magic way works only if you use the Mastodon software, it can carry over all your followers.

I went with [Akkoma](https://akkoma.dev/), it is a hard fork of Plemora (another activity-pub microblog software) that emerged over a discussion about free speech that turned into harassment.

[You can read about that here](https://coffee-and-dreams.uk/development/2022/06/24/akkoma.html). In short, Akkoma is about building a fun and a safe space.

They have a neat front-end that lets you put emoji reactions, and another opinionated features like getting rid of "free speech" zones from your federated time line.

Speaking of which, I used this [curated list of blocked instances by chaos.social](https://github.com/chaossocial/about/blob/master/blocked_instances.md) to get rid of racists, facist and other bad actors.

I followed [this tutorial](https://docs.akkoma.dev/develop/installation/docker_en/) to get it up and running over Docker. (note on this: at the time of writing, cloning the stable branch did not gave me the docker scripts, I had to switch to the develop branch).

Having "lost" all my previous posts (called toots), I made a list of highlighted moments from my previous account. (pinned on my profile!)

## Conclusion
It took its efforts , but it bared fruits. (is that a valid English sentence?)

You can now follow me at [@luc@fedi.lucdev.net](https://fedi.lucdev.net/luc) - And yes, this works if you use Mastodon too.

And email me at me@lucdev.net

Be well!
