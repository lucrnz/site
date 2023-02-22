---
title: "deGoogle LineageOS 20.0 (tested on Oneplus 8T 'kebab' kb2003)"
date: "2023-01-16"
description: "Remove Google services and components from LineageOS 20.0"
longDescription: "How to get rid of G-Services from your Android phone running LineageOS completly."
author: "Hera"
license: "CC-BY-SA-4.0"
---

## Disclaimer

While I would quite hope it's obvious, but I am not affiliated with Google, Lineage, or any of the softwares listed in any way, shape or form.  
I nor they are responsible for anything that happens to your device in this process, and cannot be held accountable.

## Why

Now, upon seeing this, one might very reasonably ask 'why? why does this need a guide? Isn't Lineage already deGoogled if you don't flash GApps?'

Well, yes and no:  
Lineage without GApps will indeed be missing most of the standard Google kit, whether that be Google Services Framework or the Playstore, and there's a decent chance you won't pass Google safetynet without it, either.  
However, by the very nature of being based on the Android Open Source Project, Google has its fingers very deep inside of Lineage.  
This leads to little things — most notably network checks — still phoning home to our obsessive stalker ex, Google.

It's worth mentioning that some custom ROMs, such as [Murena's /e/OS](https://e.foundation/), [CalyxOS](https://calyxos.org/), [GrapheneOS](https://grapheneos.org/) and potentially others come deGoogled by default.  
**However,** be that as it may, these ROMs have more limited device support and slower updates than Lineage.  
So there's a good chance that your device is only supported by Lineage out of those options, or you're wishing you had the latest Android version for any number of reasons, or both.  
But if you **do** have a device that is supported by one or more of these listed alternatives, and you don't mind being one or two versions of Android behind, I would **highly** reccomend them for more serious security endeavours, or for the less technically inclined deGoogler.

## What

Reasonably then, you're next question would be 'but what is it that's Googled, and how do we fix it?'  
Well, my inquisitive hypothetical reader, I compiled a list of all the things that I myself have found, browsing through dated guides of the same topic, and various forums:

- (Potential) DNS
- Captive Portals
- (Optional/Potential) SUPL
- SystemWebView
- NTP
- (Optional) Intent Filter Verification Service
- HotWordEnrollment
- Google Fi specific apps
- Honorable privacy tool mentions

You'll note that many of these are optional, we'll address why individually.  
In addition to these, there are some requirements for the method that I used personally to work correctly.  
These are not hard rules, but I cannot say for certain this method will function under other circumstances.

- LineageOS version 20.0 (may function on newer or older versions as far back as 17.0, but cannot verify)
- An Android [Treble enabled](https://github.com/phhusson/treble_experimentations/wiki/Frequently-Asked-Questions-%28FAQ%29#how-can-i-check-if-my-device-is-treble-enabled) ROM (Lineage 20.0 should always be)
- An unlocked bootloader
- Root access over ADB or other shell (such as Termux)
- Familiarity with the commandline to the point of being comfortable with basic bash usage and CLI text editing
- Patience and willingness to troubleshoot your device

And this should go without saying, but do not flash any sort of GApps, OpenGApps, MicroG or otherwise.  
If you install Google, you're obviously not deGoogling, and removing it after the fact is out of the scope of this guide.

## How

And now we get into the really bloody long bit.  
The instructions.

##

#### 1. DNS

Now, your DNS actually may or may not be Googled, from what I've seen it varies somewhat, depending on both your version of the ROM and your service provider.  
A good way to test this is this [DNSLeakTest](https://dnsleaktest.com/).  
If it is, Google will be able to see and collect nigh on any web query you make with the device.

If the result of the DNSLeakTest says anything other than Google as the service provider, then it's already deGoogled, though maybe not secure.

If it _does_ say Google, or you don't wish to use your default service, then you can do one of the following methods:

#####

> **[!!]Recommended[!!]**
>
> Go into `Settings => Network and Internet => Private DNS => Private DNS provider hostname` and type in one of the following servers (or your own that you've found [here](https://en.wikipedia.org/wiki/Public_recursive_name_server), so long as it supports DNS over TLS, and DNS hostnames):

- 1dot1dot1dot1.cloudflare-dns.com (Global)
- unicast.uncensoreddns.org (Denmark)
- dns.adguard.com (Global)(Reccomended)
- dns.opendns.com (Global)(Reccomended)
- security-filter-dns.cleanbrowsing.org (Global)

#####

> [!!]Fragile, unverified functionality[!!]
>
> Flash Magisk and use [This module](https://forum.xda-developers.com/t/module-cloudflaredns4magisk.3772375/)

#####

> [!!]Requires trust of app, may slow internet or impact battery life[!!]
>
> Use a DNS changing app like [Cloudflare Warp](https://cloudflarewarp.com/) or a privacy respecting VPN like [Proton VPN](https://protonvpn.com/)

#####

Once you've done one of these, visit [DNSLeakTest](https://dnsleaktest.com/) again to verify that your DNS is functioning properly, and reporting as the correct DNS provider.  
Do this both on Wifi and on data only, as functionality is not entirely consistent between the two.  
The standard test should be sufficient.

##

#### 2. Captive Portals

When registering on a new WiFi network, many networks want you to use a web sign-in system as opposed to the standard WPA/WPA2 password management.  
When this is done, your phone by default checks in to make sure it's working, and serves an error 204 if it is not.  
Normally this is reported to Google, telling them every time you connect to a WiFi network, and which one it is, whether or not it requires web sign-in.  
For this, an old 2019 guide's settings seem to remain valid.

#####

**You will need rooted ADB or another Android shell at this point in the procedure.**

- This can be found in the developer options of Lineage 20.0, under rooted debugging.  
  Or you can flash Magisk, and grant Termux (or another Android shell) root permissions.

#####

> Choosing a Captive Portal server

- If you would rather simply disable it, you can do that as well, but it may break things, and lock you out of networks that require browser sign-in.

#####

1. Mike Kuketz's server (German):
   - http://captiveportal.kuketz.de
   - https://captiveportal.kuketz.de

#####

2. /e/ foundation (Global, reccomended):
   - http://204.ecloud.global
   - https://e.foundation/net_204/

#####

3. ElementaryOS (Global):
   - http://elementary.io/generate_204
   - https://elementary.io/generate_204

#####

4. Azure (Global, not reccomended):
   - http://httpstat.us/204
   - https://httpstat.us/204

#####

###### [!!]Make sure to keep in mind the differences between the http, and https addresses at this point, and to use every slash written. This will not function properly if any characters are missing or misplaced.[!!]

###

**If not using ADB, just type `su` into the shell and hit enter.**

#####

> ADB instructions

```
adb devices # (optional) make sure that device is connected and USB debugging is permitted, if not, press 'OK' on device prompt
adb root # Allow USB debugging on device again if prompted
adb shell
```

#####

> Shell commands

Once you've entered the root shell, whether by ADB, root Termux, or other, enter the following commands in sequence (replace what's in the brackets with one of the listed URLs, http and https respectively):

```
settings put global captive_portal_http_url [http_url]
settings put global captive_portal_https_url [https_url]
settings put global captive_portal_fallback_url [http_url]
settings put global captive_portal_other_fallback_urls [http_url]
```

Or to simply disable the captive portal (May break web sign-in networks):

```
settings put global captive_portal_mode 0
```

##

#### 3. SUPL

SUPL data is used to aid in positional accuracy of GPS tracking.  
This is actually now **disabled by default** in LineageOS 20.0, and GPS accuracy seems fine without it in my testing, but can be enabled should you need it.  
If you do enable it, any provider you choose will be able to ping your location with some regularity using these domains.

If you do wish to enable it, you will need to once again enter a rooted (Android or adb) shell, just as we did in the Captive Portal step, and edit the /system/etc/gps.conf file in your CLI text editor of choice.  
Scroll down to the line surrounded by hashtags that reads "AGPS server settings".  
On a new line directly underneath the first block of commented lines, recreate the `SUPL_HOST=` and `SUPL_PORT=` example lines without the hashtags or spaces in front.  
Then, in the `SUPL_HOST=` line, provide one of the following domains, or your own (Without any slashes, colons, flags, or so forth):

- supl.sonyericsson.com
- supl.vodafone.com

If you choose to use either of these domains, append `7275` to the `SUPL_PORT=` line. Otherwise, supply the open port of whatever SUPL host you chose.

> Example

```
SUPL_HOST=supl.vodafone.com
SUPL_PORT=7275
```

##

#### 4. SystemWebView

This is by far the most finnicky part of the process, and the part that took me the longest to get right.  
Android ships with a 'WebView' framework for any app that would like to host web content without relying on an inbuilt web framework.  
The difficulty, however, lies in the fact that this makes Chromium a hard dependency of the Android system, and you must have some sort of Chromium based system installed upon your phone at all times in order for many apps to function.  
So, you're funneling every URL these apps use through Google's own browser, open source or no.

The best we can do here is use Bromite, a hardened and deGoogled fork of Chromium, as our SystemWebView.

The 'official' way of doing this involves editing the config_webview_packages.xml in the framework-res.apk system app.

###### [!!]Please do not do this unless absolutely necessary. While it can technically be done this way, there is a very good chance you lock yourself into a bootloop, or hard brick your device.[!!]

The much less destructive, much easier, and much safer method, is to superimpose the data onto this XML using [Bromite SystemWebView Overlay](https://github.com/arovlad/bromite-webview-overlay).  
The official instructions for this component are sufficient, but I will note that I had to install it manually to the system partition, as instructed under the **Manual installation** section of the `README.md`.  
If the set of instructions you use doesn't work, don't worry, your system should be unharmed, as unsuccessfully installing a system overlay simply means that no changes are made.

##

#### 5. NTP

As a top comment on the old 2019 guide mentioned, the NTP server is also a large tracking vector.  
This server regularly updates the time on your device to make sure that it's up to date, again checking in with Google every time you enable networking, and where exactly you are.

The commenter also mentioned that modern SIM cards have [NITZ](https://en.wikipedia.org/wiki/NITZ), so they should be able to keep the time up to date without needing network connectivity whatsoever, and you can just block the domain with something like [AdAway](https://f-droid.org/en/packages/org.adaway) (Like I did).

However, if you don't want to/can't block this domain, or would like to use an NTP server just in case:  
You can return to our rooted (adb/Android) shell, and run `settings put global ntp_server pool.ntp.org` for your phone to simply connect to the nearest open NTP server, rendering you anonymous.  
Or, you may specify any NTP server you wish (including your own).

##

#### 6. Intent Filter Verification Service

Now, this is an android system app service that's a bit like the human appendix.  
No one can really tell what it does, why it's there, or who it's for.  
But, removing it causes no known harm, and leaving it in might cause some pretty big problems.  
Essentially, according to [this forum thread](https://android.stackexchange.com/questions/191163/what-does-the-intent-filter-verification-service-app-from-google-do), it occasionally pings a variety of web services like Amazon and Google for... Some reason.  
I myself have disabled it, and the only difference I've noticed is that it no longer issues these pings.  
To do this, you can go to `Settings => Apps` press the three dot menu in the top right, and select 'show system', and scroll until you find "Intent Filter Verification Service". Once you find it, tap it, and disable it. Then tap storage, and clear storage and cache.  
Alternatively, go to Settings, and search for the app name.

If you're _really_ determined, you can use a rooted tool like f-droid's [App Manager](https://f-droid.org/en/packages/io.github.muntashirakon.AppManager) to uninstall it outright (or use ADB again).

###### [!!]However, I have No Idea how this will affect your system, so do so at your own risk.[!!]

##

#### 6. HotWordEnrollment

Some LineageOS devices, particularly Google Fi enabled ones, come with certain "HotWordEnrollment" system apps (`com.android.hotwordenrollment.xgoogle, com.android.hotwordenrollment.tgoogle` and or `com.android.hotwordenrollment.okgoogle`).  
These allow the Google Assistant app to listen to you at a lower level, should you have it installed.

Now, you obviously shouldn't if you're trying to deGoogle, but do keep in mind that if at any point you wish to use Google Assistant, or for that matter Google Fi, it may not function properly without these installed or enabled.  
First, the gentle option is to do as we did with Intent Filter Verification Service.  
Simply disable the apps and clear their data and cache.  
However, as I mentioned previously, you can uninstall it via a rooted (adb/Android) shell, or with a third party rooted tool like [App Manager](https://f-droid.org/en/packages/io.github.muntashirakon.AppManager) if you're confident you won't need it.

###### [!!]Be aware that the uninstall and reinstall of system apps can be quite messy and may cause breakage in unexpected places[!!]

##

#### 7. Google Fi

Certain Google Fi enabled devices need some extra GApps installed to function with Google Fi services.

So, given you're not using Google Fi, you can remove them.  
The process is the same as the Intent Filter Verification Service and HotWordEnrollment. You can disable them all, or clear all data. Or, if you have a rooted shell or package manager, you can uninstall them outright.

The apps are as follows:

- Tycho (com.google.android.apps.tycho)
- Google Connectivity Services (com.google.android.apps.gcs)
- Carrier Services (com.google.android.ims)

##

#### 9. Honorable privacy tool mentions

Now, obviously, these will change as LineageOS updates.  
They might add new things, or remove old.  
So, I'd like to mention some privacy tools that I used to both sniff these out and block whatever I missed:

- [Adaway](https://f-droid.org/en/packages/org.adaway)
- [App Manager](https://f-droid.org/en/packages/org.adaway)
- [Magisk](https://github.com/topjohnwu/Magisk)

##

#### Conclusion

This guide is subject to change and may at times become invalid, remember that I am only able to test it on devices that I own (at the moment the OP8T) and on LineageOS versions that I used at the time of making (20.0).  
So your mileage well may vary.

If you have any questions, comments, or contributions you would like to give me; feel free to reach me on my Fediverse account: [@alfredohno@snowdin.town](https://snowdin.town/users/alfredohno)  
Or via Matrix: [@hera:catgirl.cloud](https://matrix.to/#/@hera:catgirl.cloud)

If you would like to redistribute or alter this guide in any way, please ask first and Give Credit Where Credit is Due.

##

#### Credits

- Me (Hera (The author))
- [2019 guide by u/hungriestjoe](https://reddit.rtrace.io/r/privacy/comments/cldrym/how_to_degoogle_lineageos_in_2019/)
- [2021 video guide by Mental Outlaw](https://www.youtube.com/watch?v=E1U5qoiR1fM)
- My lovely Fediverse mutuals who were patient with me the whole time I was ranting about this
