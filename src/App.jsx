import { useState, useEffect, useRef } from "react";

// ─── TOOLS ────────────────────────────────────────────────────────────────────
const TOOLS = [
  { id:1,  name:"ChatGPT",          category:"Writing",     pricing:"Free / $20/mo",      description:"OpenAI's flagship AI for writing, research, coding, and brainstorming at scale.",            url:"https://chat.openai.com",             logo:"https://www.google.com/s2/favicons?domain=chat.openai.com&sz=128",          featured:true  },
  { id:2,  name:"Claude",           category:"Writing",     pricing:"Free / $20/mo",      description:"Anthropic's AI for nuanced reasoning, long docs, and thoughtful writing.",                   url:"https://claude.ai",                   logo:"https://www.google.com/s2/favicons?domain=claude.ai&sz=128",           featured:true  },
  { id:3,  name:"Jasper AI",        category:"Writing",     pricing:"From $39/mo",        description:"Marketing-focused AI for blogs, ads, emails, and brand-voice content at volume.",            url:"https://jasper.ai",                   logo:"https://www.google.com/s2/favicons?domain=jasper.ai&sz=128",           featured:false },
  { id:4,  name:"Copy.ai",          category:"Writing",     pricing:"Free / $36/mo",      description:"AI copywriting for product descriptions, captions, sales emails, and campaigns.",            url:"https://copy.ai",                     logo:"https://www.google.com/s2/favicons?domain=copy.ai&sz=128",             featured:false },
  { id:5,  name:"Grammarly",        category:"Writing",     pricing:"Free / $12/mo",      description:"AI writing assistant catching grammar, tone, clarity, and style issues in real time.",       url:"https://grammarly.com",               logo:"https://www.google.com/s2/favicons?domain=grammarly.com&sz=128",       featured:false },
  { id:6,  name:"Writesonic",       category:"Writing",     pricing:"Free / $16/mo",      description:"AI platform for SEO-optimized blogs, landing pages, and product descriptions.",             url:"https://writesonic.com",              logo:"https://www.google.com/s2/favicons?domain=writesonic.com&sz=128",      featured:false },
  { id:7,  name:"Wordtune",         category:"Writing",     pricing:"Free / $9.99/mo",    description:"Rewrites and rephrases sentences for clarity, conciseness, and better tone.",                url:"https://wordtune.com",                logo:"https://www.google.com/s2/favicons?domain=wordtune.com&sz=128",        featured:false },
  { id:8,  name:"Quillbot",         category:"Writing",     pricing:"Free / $9.95/mo",    description:"Paraphrasing and summarization tool trusted by millions of students and writers.",           url:"https://quillbot.com",                logo:"https://www.google.com/s2/favicons?domain=quillbot.com&sz=128",        featured:false },
  { id:9,  name:"Notion AI",        category:"Writing",     pricing:"Add-on $10/mo",      description:"AI built into Notion to draft, summarize, translate, and organize notes.",                   url:"https://notion.so",                   logo:"https://www.google.com/s2/favicons?domain=notion.so&sz=128",           featured:false },
  { id:10, name:"Sudowrite",        category:"Writing",     pricing:"From $10/mo",        description:"AI writing partner built for fiction writers — characters, plot, and beautiful prose.",      url:"https://sudowrite.com",               logo:"https://www.google.com/s2/favicons?domain=sudowrite.com&sz=128",       featured:false },

  { id:11, name:"Midjourney",       category:"Image",       pricing:"From $10/mo",        description:"Generate stunning photorealistic and artistic images from text — the gold standard.",         url:"https://midjourney.com",              logo:"https://www.google.com/s2/favicons?domain=midjourney.com&sz=128",      featured:true  },
  { id:12, name:"DALL·E 3",         category:"Image",       pricing:"Pay per use",        description:"OpenAI's image model built into ChatGPT Plus with precise prompt adherence.",                url:"https://openai.com/dall-e-3",         logo:"https://www.google.com/s2/favicons?domain=openai.com&sz=128",          featured:false },
  { id:13, name:"Stable Diffusion", category:"Image",       pricing:"Free / Open Source", description:"Open-source image model you can run locally — fully customizable and free.",                 url:"https://stability.ai",                logo:"https://www.google.com/s2/favicons?domain=stability.ai&sz=128",        featured:false },
  { id:14, name:"Adobe Firefly",    category:"Image",       pricing:"Free / $4.99/mo",    description:"Adobe's generative AI for images, vectors, and design templates. Commercially safe.",        url:"https://firefly.adobe.com",           logo:"https://www.google.com/s2/favicons?domain=firefly.adobe.com&sz=128",           featured:false },
  { id:15, name:"Leonardo AI",      category:"Image",       pricing:"Free / $10/mo",      description:"Powerful image generation with fine-tuned models for gaming assets and concept art.",         url:"https://leonardo.ai",                 logo:"https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128",         featured:true  },
  { id:16, name:"Ideogram",         category:"Image",       pricing:"Free / $7/mo",       description:"AI image generator with industry-leading text rendering accuracy inside images.",             url:"https://ideogram.ai",                 logo:"https://www.google.com/s2/favicons?domain=ideogram.ai&sz=128",         featured:false },
  { id:17, name:"Canva AI",         category:"Image",       pricing:"Free / $12.99/mo",   description:"Design platform with built-in AI image generation and Magic Studio tools.",                  url:"https://canva.com",                   logo:"https://www.google.com/s2/favicons?domain=canva.com&sz=128",           featured:false },
  { id:18, name:"Recraft",          category:"Image",       pricing:"Free / $12/mo",      description:"Generate vectors, icons, and brand-consistent illustrations with AI.",                        url:"https://recraft.ai",                  logo:"https://www.google.com/s2/favicons?domain=recraft.ai&sz=128",          featured:false },
  { id:19, name:"Luma AI",          category:"Image",       pricing:"Free / $29.99/mo",   description:"Generate and capture realistic 3D models and scenes using AI from photos.",                  url:"https://lumalabs.ai",                 logo:"https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128",         featured:false },
  { id:20, name:"Flux",             category:"Image",       pricing:"Free / API",         description:"Black Forest Labs' state-of-the-art open model rivaling Midjourney quality.",                url:"https://blackforestlabs.ai",          logo:"https://www.google.com/s2/favicons?domain=blackforestlabs.ai&sz=128",  featured:false },

  { id:21, name:"Runway ML",        category:"Video",       pricing:"Free / $15/mo",      description:"AI video generation and editing — text to video, image to video, and motion brush.",         url:"https://runwayml.com",                logo:"https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",        featured:true  },
  { id:22, name:"Sora",             category:"Video",       pricing:"ChatGPT Plus",       description:"OpenAI's cinematic text-to-video model generating realistic clips up to 60 seconds.",         url:"https://sora.com",                    logo:"https://www.google.com/s2/favicons?domain=sora.com&sz=128",          featured:true  },
  { id:23, name:"Kling AI",         category:"Video",       pricing:"Free / $8/mo",       description:"High-quality AI video with realistic motion, physics simulation, and cinematics.",            url:"https://klingai.com",                 logo:"https://www.google.com/s2/favicons?domain=klingai.com&sz=128",         featured:false },
  { id:24, name:"HeyGen",           category:"Video",       pricing:"Free / $29/mo",      description:"Create AI avatar videos with lip-sync in 40+ languages — no camera needed.",                 url:"https://heygen.com",                  logo:"https://www.google.com/s2/favicons?domain=heygen.com&sz=128",          featured:false },
  { id:25, name:"Synthesia",        category:"Video",       pricing:"From $22/mo",        description:"Professional AI presenter videos with realistic avatars — used by 50,000+ companies.",        url:"https://synthesia.io",                logo:"https://www.google.com/s2/favicons?domain=synthesia.io&sz=128",        featured:false },
  { id:26, name:"Pika Labs",        category:"Video",       pricing:"Free / $8/mo",       description:"Turn images and prompts into animated video clips with expressive AI motion.",                url:"https://pika.art",                    logo:"https://www.google.com/s2/favicons?domain=pika.art&sz=128",            featured:false },
  { id:27, name:"Descript",         category:"Video",       pricing:"Free / $12/mo",      description:"Edit video by editing text — AI overdub, eye contact, and filler word removal.",             url:"https://descript.com",                logo:"https://www.google.com/s2/favicons?domain=descript.com&sz=128",        featured:false },
  { id:28, name:"Captions AI",      category:"Video",       pricing:"Free / $7.99/mo",    description:"Auto-generate stylized captions for social videos with AI lip-sync.",                         url:"https://captions.ai",                 logo:"https://www.google.com/s2/favicons?domain=captions.ai&sz=128",         featured:false },
  { id:29, name:"Luma Dream Machine",category:"Video",      pricing:"Free / $29.99/mo",   description:"Generate high-quality realistic video from text and images with smooth motion.",             url:"https://lumalabs.ai/dream-machine",   logo:"https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128",         featured:false },

  { id:30, name:"GitHub Copilot",   category:"Coding",      pricing:"Free / $10/mo",      description:"AI pair programmer that autocompletes code, suggests functions, and explains bugs.",          url:"https://github.com/features/copilot", logo:"https://www.google.com/s2/favicons?domain=github.com&sz=128",          featured:true  },
  { id:31, name:"Cursor",           category:"Coding",      pricing:"Free / $20/mo",      description:"AI-first code editor on VS Code with deep codebase chat and multi-file edits.",              url:"https://cursor.sh",                   logo:"https://www.google.com/s2/favicons?domain=cursor.sh&sz=128",           featured:true  },
  { id:32, name:"Replit AI",        category:"Coding",      pricing:"Free / $25/mo",      description:"AI-powered browser IDE for building, running, and deploying full apps instantly.",            url:"https://replit.com",                  logo:"https://www.google.com/s2/favicons?domain=replit.com&sz=128",          featured:false },
  { id:33, name:"Tabnine",          category:"Coding",      pricing:"Free / $12/mo",      description:"AI code completion for 80+ languages with private on-prem deployment options.",               url:"https://tabnine.com",                 logo:"https://www.google.com/s2/favicons?domain=tabnine.com&sz=128",         featured:false },
  { id:34, name:"Codeium",          category:"Coding",      pricing:"Free / $15/mo",      description:"Fast AI code completion in 70+ editors — one of the most generous free tiers.",              url:"https://codeium.com",                 logo:"https://www.google.com/s2/favicons?domain=codeium.com&sz=128",         featured:false },
  { id:35, name:"Bolt.new",         category:"Coding",      pricing:"Free / $20/mo",      description:"Prompt-to-app AI that builds and deploys full-stack web apps in the browser.",               url:"https://bolt.new",                    logo:"https://www.google.com/s2/favicons?domain=bolt.new&sz=128",            featured:true  },
  { id:36, name:"V0 by Vercel",     category:"Coding",      pricing:"Free / $20/mo",      description:"Generate production-ready React UI components from text prompts — deploys instantly.",        url:"https://v0.dev",                      logo:"https://www.google.com/s2/favicons?domain=v0.dev&sz=128",          featured:false },
  { id:37, name:"Windsurf",         category:"Coding",      pricing:"Free / $15/mo",      description:"Agentic AI IDE that takes multi-step actions, reads your codebase, and ships features.",      url:"https://codeium.com/windsurf",        logo:"https://www.google.com/s2/favicons?domain=windsurf.com&sz=128",         featured:false },
  { id:38, name:"Lovable",          category:"Coding",      pricing:"Free / $20/mo",      description:"Build full-stack web apps from chat — generates React, Supabase backend and deployment.",     url:"https://lovable.dev",                 logo:"https://www.google.com/s2/favicons?domain=lovable.dev&sz=128",         featured:false },

  { id:39, name:"ElevenLabs",       category:"Audio",       pricing:"Free / $5/mo",       description:"Ultra-realistic AI voice cloning and text-to-speech in 29 languages.",                       url:"https://elevenlabs.io",               logo:"https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128",       featured:true  },
  { id:40, name:"Murf AI",          category:"Audio",       pricing:"Free / $19/mo",      description:"Studio-quality voice generator with 120+ voices across 20 languages.",                       url:"https://murf.ai",                     logo:"https://www.google.com/s2/favicons?domain=murf.ai&sz=128",             featured:false },
  { id:41, name:"Suno AI",          category:"Audio",       pricing:"Free / $8/mo",       description:"Create complete original songs — lyrics, melody, and production — from a text prompt.",       url:"https://suno.ai",                     logo:"https://www.google.com/s2/favicons?domain=suno.ai&sz=128",             featured:true  },
  { id:42, name:"Udio",             category:"Audio",       pricing:"Free / $10/mo",      description:"AI music generator that creates full songs with vocals from text prompts.",                   url:"https://udio.com",                    logo:"https://www.google.com/s2/favicons?domain=udio.com&sz=128",            featured:true  },
  { id:43, name:"Soundraw",         category:"Audio",       pricing:"Free / $16.99/mo",   description:"Generate royalty-free music with AI — set mood, genre, BPM, and length.",                    url:"https://soundraw.io",                 logo:"https://www.google.com/s2/favicons?domain=soundraw.io&sz=128",         featured:false },
  { id:44, name:"Adobe Podcast",    category:"Audio",       pricing:"Free",               description:"AI audio cleanup that makes any microphone recording sound studio-quality.",                   url:"https://podcast.adobe.com",           logo:"https://www.google.com/s2/favicons?domain=podcast.adobe.com&sz=128",           featured:false },
  { id:45, name:"Podcastle",        category:"Audio",       pricing:"Free / $11.99/mo",   description:"All-in-one podcast recording, editing, and AI enhancement in the browser.",                   url:"https://podcastle.ai",                logo:"https://www.google.com/s2/favicons?domain=podcastle.ai&sz=128",        featured:false },

  { id:46, name:"Perplexity AI",    category:"Research",    pricing:"Free / $20/mo",      description:"AI-powered search engine giving cited, real-time answers with source links.",                url:"https://perplexity.ai",               logo:"https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",       featured:true  },
  { id:47, name:"Gemini",           category:"Research",    pricing:"Free / $20/mo",      description:"Google's multimodal AI with real-time web access for search and research.",                   url:"https://gemini.google.com",           logo:"https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128",          featured:false },
  { id:48, name:"Elicit",           category:"Research",    pricing:"Free / $12/mo",      description:"AI research assistant that finds, summarizes, and synthesizes academic papers.",              url:"https://elicit.org",                  logo:"https://www.google.com/s2/favicons?domain=elicit.org&sz=128",          featured:false },
  { id:49, name:"Consensus",        category:"Research",    pricing:"Free / $8.99/mo",    description:"Search engine for scientific evidence — extracts consensus from peer-reviewed papers.",       url:"https://consensus.app",               logo:"https://www.google.com/s2/favicons?domain=consensus.app&sz=128",       featured:false },
  { id:50, name:"NotebookLM",       category:"Research",    pricing:"Free",               description:"Google's AI companion that grounds every answer in your own uploaded documents.",             url:"https://notebooklm.google.com",       logo:"https://www.google.com/s2/favicons?domain=notebooklm.google.com&sz=128",          featured:true  },
  { id:51, name:"Scite",            category:"Research",    pricing:"Free / $10/mo",      description:"Find how papers have been cited — supporting, contrasting across millions of papers.",         url:"https://scite.ai",                    logo:"https://www.google.com/s2/favicons?domain=scite.ai&sz=128",            featured:false },
  { id:52, name:"You.com",          category:"Research",    pricing:"Free / $15/mo",      description:"Privacy-focused AI search with citations, code interpreter, and research modes.",             url:"https://you.com",                     logo:"https://www.google.com/s2/favicons?domain=you.com&sz=128",             featured:false },

  { id:53, name:"Zapier AI",        category:"Business",    pricing:"Free / $20/mo",      description:"Automate workflows between 6,000+ apps with AI-powered logic and smart actions.",            url:"https://zapier.com",                  logo:"https://www.google.com/s2/favicons?domain=zapier.com&sz=128",          featured:false },
  { id:54, name:"Fathom",           category:"Business",    pricing:"Free / $15/mo",      description:"AI meeting recorder that transcribes calls and extracts action items automatically.",         url:"https://fathom.video",                logo:"https://www.google.com/s2/favicons?domain=fathom.video&sz=128",        featured:true  },
  { id:55, name:"Otter.ai",         category:"Business",    pricing:"Free / $8.33/mo",    description:"Real-time AI transcription and meeting notes for Zoom, Meet, and Teams.",                    url:"https://otter.ai",                    logo:"https://www.google.com/s2/favicons?domain=otter.ai&sz=128",            featured:false },
  { id:56, name:"Fireflies.ai",     category:"Business",    pricing:"Free / $10/mo",      description:"AI notetaker that records, transcribes, and creates searchable meeting intelligence.",        url:"https://fireflies.ai",                logo:"https://www.google.com/s2/favicons?domain=fireflies.ai&sz=128",        featured:false },
  { id:57, name:"Gamma",            category:"Business",    pricing:"Free / $8/mo",       description:"Create beautiful AI-generated presentations and web pages from a single prompt.",             url:"https://gamma.app",                   logo:"https://www.google.com/s2/favicons?domain=gamma.app&sz=128",           featured:true  },
  { id:58, name:"Tome",             category:"Business",    pricing:"Free / $16/mo",      description:"AI presentation tool that generates full polished decks from a single prompt.",               url:"https://tome.app",                    logo:"https://www.google.com/s2/favicons?domain=tome.app&sz=128",            featured:false },
  { id:59, name:"Beautiful.ai",     category:"Business",    pricing:"Free / $12/mo",      description:"AI presentation builder that auto-designs stunning slides as you type.",                      url:"https://beautiful.ai",                logo:"https://www.google.com/s2/favicons?domain=beautiful.ai&sz=128",        featured:false },
  { id:60, name:"HubSpot AI",       category:"Business",    pricing:"Free / Varies",      description:"AI tools inside HubSpot CRM for drafting emails and automating outreach.",                    url:"https://hubspot.com",                 logo:"https://www.google.com/s2/favicons?domain=hubspot.com&sz=128",         featured:false },

  { id:61, name:"Mem.ai",           category:"Productivity",pricing:"Free / $14.99/mo",   description:"AI personal knowledge base that auto-organizes notes and surfaces key insights.",            url:"https://mem.ai",                      logo:"https://www.google.com/s2/favicons?domain=mem.ai&sz=128",              featured:false },
  { id:62, name:"Taskade",          category:"Productivity",pricing:"Free / $8/mo",       description:"AI project management with tasks, mind maps, docs, and team collaboration.",                  url:"https://taskade.com",                 logo:"https://www.google.com/s2/favicons?domain=taskade.com&sz=128",         featured:false },
  { id:63, name:"Motion",           category:"Productivity",pricing:"From $19/mo",        description:"AI calendar that automatically schedules your tasks into available time slots.",               url:"https://usemotion.com",               logo:"https://www.google.com/s2/favicons?domain=usemotion.com&sz=128",       featured:false },
  { id:64, name:"Reclaim AI",       category:"Productivity",pricing:"Free / $8/mo",       description:"Smart scheduling AI that protects focus time for habits and tasks in your calendar.",         url:"https://reclaim.ai",                  logo:"https://www.google.com/s2/favicons?domain=reclaim.ai&sz=128",          featured:true  },
  { id:65, name:"Raycast AI",       category:"Productivity",pricing:"From $8/mo",         description:"Mac launcher with built-in AI for writing, quick search, and code commands.",                 url:"https://raycast.com",                 logo:"https://www.google.com/s2/favicons?domain=raycast.com&sz=128",         featured:false },
  { id:66, name:"Tana",             category:"Productivity",pricing:"Free / Invite",      description:"Outliner-based AI workspace turning freeform notes into structured knowledge.",               url:"https://tana.inc",                    logo:"https://www.google.com/s2/favicons?domain=tana.inc&sz=128",            featured:false },

  { id:67, name:"Figma AI",         category:"Design",      pricing:"Free / $12/mo",      description:"AI inside Figma — auto layout, component generation, and first draft designs.",              url:"https://figma.com",                   logo:"https://www.google.com/s2/favicons?domain=figma.com&sz=128",           featured:true  },
  { id:68, name:"Galileo AI",       category:"Design",      pricing:"Waitlist",           description:"Generate editable UI designs from text — instantly exports to Figma.",                        url:"https://usegalileo.ai",               logo:"https://www.google.com/s2/favicons?domain=usegalileo.ai&sz=128",       featured:false },
  { id:69, name:"Uizard",           category:"Design",      pricing:"Free / $12/mo",      description:"Transform sketches or screenshots into editable digital UI prototypes with AI.",              url:"https://uizard.io",                   logo:"https://www.google.com/s2/favicons?domain=uizard.io&sz=128",           featured:false },
  { id:70, name:"Looka",            category:"Design",      pricing:"Pay per use",        description:"AI logo and brand identity generator — create a full brand kit in minutes.",                  url:"https://looka.com",                   logo:"https://www.google.com/s2/favicons?domain=looka.com&sz=128",           featured:false },
  { id:71, name:"Khroma",           category:"Design",      pricing:"Free",               description:"AI color tool that learns your preferences and generates on-brand color palettes.",            url:"https://khroma.co",                   logo:"https://www.google.com/s2/favicons?domain=khroma.co&sz=128",           featured:false },
  { id:72,  name:"Framer AI",           category:"Design",       pricing:"Free / $15/mo",       description:"AI website builder that generates and publishes responsive sites from a text prompt.",          url:"https://framer.com",                     logo:"https://www.google.com/s2/favicons?domain=framer.com&sz=128",            featured:false },

  // WRITING+
  { id:73,  name:"Rytr",                category:"Writing",      pricing:"Free / $9/mo",        description:"Affordable AI writing assistant for blog posts, emails, and social content in 30+ languages.",     url:"https://rytr.me",                        logo:"https://www.google.com/s2/favicons?domain=rytr.me&sz=128",               featured:false },
  { id:74,  name:"Hyperwrite",          category:"Writing",      pricing:"Free / $19.99/mo",    description:"Personal AI writing assistant that learns your style and autocompletes sentences as you type.",     url:"https://hyperwriteai.com",               logo:"https://www.google.com/s2/favicons?domain=hyperwriteai.com&sz=128",      featured:false },
  { id:75,  name:"Anyword",             category:"Writing",      pricing:"From $39/mo",         description:"AI copywriting platform with predictive performance scores for every piece of content you create.", url:"https://anyword.com",                    logo:"https://www.google.com/s2/favicons?domain=anyword.com&sz=128",           featured:false },
  { id:76,  name:"Longshot AI",         category:"Writing",      pricing:"From $19/mo",         description:"Fact-checked AI content writer that verifies claims while generating long-form blog articles.",     url:"https://longshot.ai",                    logo:"https://www.google.com/s2/favicons?domain=longshot.ai&sz=128",           featured:false },
  { id:77,  name:"Ink Editor",          category:"Writing",      pricing:"Free / $39/mo",       description:"SEO-focused AI writer that scores your content for search optimization in real time as you type.",  url:"https://inkforall.com",                  logo:"https://www.google.com/s2/favicons?domain=inkforall.com&sz=128",         featured:false },
  { id:78,  name:"Peppertype",          category:"Writing",      pricing:"From $25/mo",         description:"AI content generation platform with 40+ templates for marketing, ads, and product copy.",          url:"https://peppertype.ai",                  logo:"https://www.google.com/s2/favicons?domain=peppertype.ai&sz=128",         featured:false },

  // IMAGE+
  { id:79,  name:"Playground AI",       category:"Image",        pricing:"Free / $12/mo",       description:"Web-based image generator with multiple model options including Stable Diffusion and SDXL.",        url:"https://playgroundai.com",               logo:"https://www.google.com/s2/favicons?domain=playgroundai.com&sz=128",      featured:false },
  { id:80,  name:"Artbreeder",          category:"Image",        pricing:"Free / $8.99/mo",     description:"Blend and evolve images with AI to create portraits, landscapes, and abstract art collaboratively.",url:"https://artbreeder.com",                 logo:"https://www.google.com/s2/favicons?domain=artbreeder.com&sz=128",        featured:false },
  { id:81,  name:"NightCafe",           category:"Image",        pricing:"Free / Credits",      description:"AI art generator with daily free credits supporting multiple styles and algorithms.",               url:"https://nightcafe.studio",               logo:"https://www.google.com/s2/favicons?domain=nightcafe.studio&sz=128",      featured:false },
  { id:82,  name:"Bing Image Creator",  category:"Image",        pricing:"Free",                description:"Microsoft free AI image generator powered by DALL-E — no subscription or account needed.",          url:"https://www.bing.com/images/create",      logo:"https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",         featured:false },
  { id:83,  name:"Remove.bg",           category:"Image",        pricing:"Free / Pay per use",  description:"AI background remover that cuts out subjects from photos in seconds with a single click.",          url:"https://remove.bg",                      logo:"https://www.google.com/s2/favicons?domain=remove.bg&sz=128",             featured:false },
  { id:84,  name:"Clipdrop",            category:"Image",        pricing:"Free / $9/mo",        description:"Suite of AI image tools — background removal, upscaling, relighting, and object removal.",          url:"https://clipdrop.co",                    logo:"https://www.google.com/s2/favicons?domain=clipdrop.co&sz=128",           featured:false },
  { id:85,  name:"Krea AI",             category:"Image",        pricing:"Free / $24/mo",       description:"Real-time AI image generation canvas — draw rough sketches and watch them become stunning art.",    url:"https://krea.ai",                        logo:"https://www.google.com/s2/favicons?domain=krea.ai&sz=128",               featured:false },
  { id:86,  name:"Pixlr AI",            category:"Image",        pricing:"Free / $7.99/mo",     description:"Online photo editor with AI-powered background removal, generative fill, and smart tools.",         url:"https://pixlr.com",                      logo:"https://www.google.com/s2/favicons?domain=pixlr.com&sz=128",             featured:false },

  // VIDEO+
  { id:87,  name:"Invideo AI",          category:"Video",        pricing:"Free / $20/mo",       description:"Turn text scripts into fully edited videos with AI voiceover, stock footage, and subtitles.",       url:"https://invideo.io",                     logo:"https://www.google.com/s2/favicons?domain=invideo.io&sz=128",            featured:false },
  { id:88,  name:"Pictory",             category:"Video",        pricing:"From $19/mo",         description:"Convert long blog posts and scripts into short branded social media videos automatically.",           url:"https://pictory.ai",                     logo:"https://www.google.com/s2/favicons?domain=pictory.ai&sz=128",            featured:false },
  { id:89,  name:"Opus Clip",           category:"Video",        pricing:"Free / $15/mo",       description:"AI video repurposing — turns long videos into viral short clips for TikTok, Reels, and Shorts.",    url:"https://opus.pro",                       logo:"https://www.google.com/s2/favicons?domain=opus.pro&sz=128",              featured:true  },
  { id:90,  name:"Veed.io",             category:"Video",        pricing:"Free / $18/mo",       description:"Online video editor with AI subtitles, translation, eye contact correction, and AI avatars.",        url:"https://veed.io",                        logo:"https://www.google.com/s2/favicons?domain=veed.io&sz=128",               featured:false },
  { id:91,  name:"Fliki",               category:"Video",        pricing:"Free / $21/mo",       description:"Turn text and blog posts into videos with realistic AI voices in 75+ languages effortlessly.",       url:"https://fliki.ai",                       logo:"https://www.google.com/s2/favicons?domain=fliki.ai&sz=128",              featured:false },
  { id:92,  name:"Topaz Video AI",      category:"Video",        pricing:"From $299 one-time",  description:"AI video enhancement software — upscale, denoise, and sharpen footage to stunning 4K quality.",     url:"https://topazlabs.com",                  logo:"https://www.google.com/s2/favicons?domain=topazlabs.com&sz=128",         featured:false },
  { id:93,  name:"Steve AI",            category:"Video",        pricing:"From $15/mo",         description:"Create animated and live-action explainer videos from text scripts using AI automation.",            url:"https://steve.ai",                       logo:"https://www.google.com/s2/favicons?domain=steve.ai&sz=128",              featured:false },

  // CODING+
  { id:94,  name:"Aider",               category:"Coding",       pricing:"Free / Open Source",  description:"AI pair programmer in your terminal — edits your local codebase via chat using any LLM.",           url:"https://aider.chat",                     logo:"https://www.google.com/s2/favicons?domain=aider.chat&sz=128",            featured:false },
  { id:95,  name:"Sourcegraph Cody",    category:"Coding",       pricing:"Free / $9/mo",        description:"AI coding assistant with deep codebase context — understands your entire repo structure at once.",   url:"https://sourcegraph.com",                logo:"https://www.google.com/s2/favicons?domain=sourcegraph.com&sz=128",       featured:false },
  { id:96,  name:"Amazon Q Developer",  category:"Coding",       pricing:"Free / $19/mo",       description:"AWS AI coding assistant trained on millions of code examples — perfect for cloud development.",      url:"https://aws.amazon.com/q/developer",     logo:"https://www.google.com/s2/favicons?domain=amazon.com&sz=128",            featured:false },
  { id:97,  name:"Pieces for Devs",     category:"Coding",       pricing:"Free / $10/mo",       description:"AI developer memory tool — saves, searches, and reuses code snippets with full context.",            url:"https://pieces.app",                     logo:"https://www.google.com/s2/favicons?domain=pieces.app&sz=128",            featured:false },
  { id:98,  name:"Continue.dev",        category:"Coding",       pricing:"Free / Open Source",  description:"Open-source AI code assistant that plugs into VS Code and JetBrains with any LLM model.",           url:"https://continue.dev",                   logo:"https://www.google.com/s2/favicons?domain=continue.dev&sz=128",          featured:false },
  { id:99,  name:"Devin",               category:"Coding",       pricing:"From $500/mo",        description:"World's first fully autonomous AI software engineer — plans, codes, debugs, and deploys apps.",      url:"https://cognition.ai",                   logo:"https://www.google.com/s2/favicons?domain=cognition.ai&sz=128",          featured:false },
  { id:100, name:"Cosine Genie",        category:"Coding",       pricing:"Free / $49/mo",       description:"AI agent that understands massive codebases and autonomously implements complex engineering tasks.",  url:"https://cosine.sh",                      logo:"https://www.google.com/s2/favicons?domain=cosine.sh&sz=128",             featured:false },

  // AUDIO+
  { id:101, name:"Resemble AI",         category:"Audio",        pricing:"Free / $0.006/sec",   description:"Hyper-realistic AI voice cloning for games, apps, and media — clone any voice in under 3 mins.",    url:"https://resemble.ai",                    logo:"https://www.google.com/s2/favicons?domain=resemble.ai&sz=128",           featured:false },
  { id:102, name:"Lalal.ai",            category:"Audio",        pricing:"Free / $15 pack",     description:"AI stem splitter — separate vocals, drums, bass, and instruments from any song in seconds.",         url:"https://lalal.ai",                       logo:"https://www.google.com/s2/favicons?domain=lalal.ai&sz=128",              featured:false },
  { id:103, name:"Aiva",                category:"Audio",        pricing:"Free / $11/mo",       description:"AI music composition for films, games, and ads — generates full orchestral and ambient scores.",      url:"https://aiva.ai",                        logo:"https://www.google.com/s2/favicons?domain=aiva.ai&sz=128",               featured:false },
  { id:104, name:"Boomy",               category:"Audio",        pricing:"Free / $9.99/mo",     description:"Create original songs in seconds and release them to Spotify — earn royalties from your AI music.",  url:"https://boomy.com",                      logo:"https://www.google.com/s2/favicons?domain=boomy.com&sz=128",             featured:false },
  { id:105, name:"Play.ht",             category:"Audio",        pricing:"Free / $31.2/mo",     description:"Realistic AI text-to-speech with 900+ voices across 142 languages — clone any voice you want.",     url:"https://play.ht",                        logo:"https://www.google.com/s2/favicons?domain=play.ht&sz=128",               featured:false },
  { id:106, name:"Cleanvoice AI",       category:"Audio",        pricing:"Free / $11/mo",       description:"Automatically removes filler words, stutters, and mouth sounds from podcast recordings.",            url:"https://cleanvoice.ai",                  logo:"https://www.google.com/s2/favicons?domain=cleanvoice.ai&sz=128",         featured:false },

  // RESEARCH+
  { id:107, name:"Semantic Scholar",    category:"Research",     pricing:"Free",                description:"AI-powered academic search engine that finds and summarizes relevant scientific papers for free.",    url:"https://semanticscholar.org",            logo:"https://www.google.com/s2/favicons?domain=semanticscholar.org&sz=128",   featured:false },
  { id:108, name:"Explainpaper",        category:"Research",     pricing:"Free / $12/mo",       description:"Upload any academic paper and ask questions — AI explains complex passages in plain English.",        url:"https://explainpaper.com",               logo:"https://www.google.com/s2/favicons?domain=explainpaper.com&sz=128",      featured:false },
  { id:109, name:"Humata AI",           category:"Research",     pricing:"Free / $14.99/mo",    description:"Chat with your PDFs and documents — AI answers questions directly from your uploaded files.",         url:"https://humata.ai",                      logo:"https://www.google.com/s2/favicons?domain=humata.ai&sz=128",             featured:false },
  { id:110, name:"Typeset.io",          category:"Research",     pricing:"Free / $20/mo",       description:"AI research workspace — search papers, read summaries, and generate literature reviews in minutes.",  url:"https://typeset.io",                     logo:"https://www.google.com/s2/favicons?domain=typeset.io&sz=128",            featured:false },
  { id:111, name:"Scholarcy",           category:"Research",     pricing:"Free / $9.99/mo",     description:"AI flashcard generator for academic papers — instantly summarizes research into digestible cards.",   url:"https://scholarcy.com",                  logo:"https://www.google.com/s2/favicons?domain=scholarcy.com&sz=128",         featured:false },

  // BUSINESS+
  { id:112, name:"Lavender",            category:"Business",     pricing:"Free / $27/mo",       description:"AI email coach that scores your sales emails and gives real-time suggestions to boost reply rates.",  url:"https://lavender.ai",                    logo:"https://www.google.com/s2/favicons?domain=lavender.ai&sz=128",           featured:false },
  { id:113, name:"Gong AI",             category:"Business",     pricing:"Custom pricing",      description:"AI revenue intelligence that analyzes every sales call and surfaces coaching opportunities.",         url:"https://gong.io",                        logo:"https://www.google.com/s2/favicons?domain=gong.io&sz=128",               featured:false },
  { id:114, name:"Tidio AI",            category:"Business",     pricing:"Free / $19/mo",       description:"AI chatbot and live chat for eCommerce — answers customer questions 24/7 and recovers carts.",       url:"https://tidio.com",                      logo:"https://www.google.com/s2/favicons?domain=tidio.com&sz=128",             featured:false },
  { id:115, name:"Klaviyo AI",          category:"Business",     pricing:"Free / From $20/mo",  description:"AI-powered email and SMS marketing platform with predictive analytics and smart segmentation.",       url:"https://klaviyo.com",                    logo:"https://www.google.com/s2/favicons?domain=klaviyo.com&sz=128",           featured:false },
  { id:116, name:"Intercom Fin", category:"Business", pricing:"From $0.99/res", description:"GPT-4 powered AI support agent that auto-resolves customer queries inside Intercom.", url:"https://intercom.com", logo:"https://www.google.com/s2/favicons?domain=intercom.com&sz=128", featured:false },

  // PRODUCTIVITY+
  { id:117, name:"Superhuman AI",       category:"Productivity", pricing:"From $30/mo",         description:"AI-powered email client that triages, summarizes, and drafts replies at superhuman speed.",          url:"https://superhuman.com",                 logo:"https://www.google.com/s2/favicons?domain=superhuman.com&sz=128",        featured:false },
  { id:118, name:"Merlin AI",           category:"Productivity", pricing:"Free / $14.25/mo",    description:"Browser extension bringing ChatGPT to every website — summarize, rewrite, and ask anything.",       url:"https://merlin.foyer.work",              logo:"https://www.google.com/s2/favicons?domain=foyer.work&sz=128",            featured:false },
  { id:119, name:"Heptabase",           category:"Productivity", pricing:"From $8.99/mo",       description:"Visual knowledge management with AI chat — think in whiteboards, linked notes, and mind maps.",      url:"https://heptabase.com",                  logo:"https://www.google.com/s2/favicons?domain=heptabase.com&sz=128",         featured:false },
  { id:120, name:"Reflect Notes",       category:"Productivity", pricing:"From $10/mo",         description:"AI note-taking app with GPT built in — summarizes meetings, backlinks ideas, and drafts for you.",   url:"https://reflect.app",                    logo:"https://www.google.com/s2/favicons?domain=reflect.app&sz=128",           featured:false },

  // DESIGN+
  { id:121, name:"Spline AI",           category:"Design",       pricing:"Free / $7/mo",        description:"3D design tool with AI generation — create interactive 3D scenes from text prompts in browser.",     url:"https://spline.design",                  logo:"https://www.google.com/s2/favicons?domain=spline.design&sz=128",         featured:false },
  { id:122, name:"Magician for Figma",  category:"Design",       pricing:"From $6/mo",          description:"AI magic wand Figma plugin — generate icons, copy, and unique images inside your design file.",      url:"https://magician.design",                logo:"https://www.google.com/s2/favicons?domain=magician.design&sz=128",       featured:false },
  { id:123, name:"Autodraw",            category:"Design",       pricing:"Free",                description:"Google AI drawing tool that guesses your sketch and replaces it with a clean professional icon.",     url:"https://autodraw.com",                   logo:"https://www.google.com/s2/favicons?domain=autodraw.com&sz=128",          featured:false },
  { id:124, name:"Visily",              category:"Design",       pricing:"Free / $20/mo",       description:"AI wireframe and UI design tool — generate mockups from text, screenshots, or hand-drawn sketches.", url:"https://visily.ai",                      logo:"https://www.google.com/s2/favicons?domain=visily.ai&sz=128",             featured:false },
  { id:125, name:"Google AI Studio",  category:"Research",     pricing:"Free / Pay per use",  description:"Google's developer playground for Gemini models — build, test, and prototype AI apps with the latest Gemini API.", url:"https://aistudio.google.com", logo:"https://www.google.com/s2/favicons?domain=aistudio.google.com&sz=128", featured:true  },
];

const CATEGORIES = ["All","Writing","Image","Video","Coding","Audio","Research","Business","Productivity","Design"];
const CAT_META = {
  All:          { color:"#00D4C8", icon:"✦",  bg:"linear-gradient(135deg,#00D4C8,#7C3AED)" },
  Writing:      { color:"#7C3AED", icon:"✍️",  bg:"linear-gradient(135deg,#7C3AED,#9333EA)" },
  Image:        { color:"#EC4899", icon:"🎨",  bg:"linear-gradient(135deg,#EC4899,#F43F5E)" },
  Video:        { color:"#F59E0B", icon:"🎬",  bg:"linear-gradient(135deg,#F59E0B,#EF4444)" },
  Coding:       { color:"#00D4C8", icon:"💻",  bg:"linear-gradient(135deg,#00D4C8,#0EA5E9)" },
  Audio:        { color:"#10B981", icon:"🎵",  bg:"linear-gradient(135deg,#10B981,#06B6D4)" },
  Research:     { color:"#3B82F6", icon:"🔍",  bg:"linear-gradient(135deg,#3B82F6,#6366F1)" },
  Business:     { color:"#F97316", icon:"📊",  bg:"linear-gradient(135deg,#F97316,#EF4444)" },
  Productivity: { color:"#A855F7", icon:"⚡",  bg:"linear-gradient(135deg,#A855F7,#7C3AED)" },
  Design:       { color:"#F43F5E", icon:"🎯",  bg:"linear-gradient(135deg,#F43F5E,#EC4899)" },
};

// ─── LOCAL STORAGE ───────────────────────────────────────────────────────────
const _picks_store={};function loadPicks(){try{const v=localStorage.getItem("abe_picks");return v?JSON.parse(v):_picks_store;}catch{return _picks_store;}}
function savePicks(p){try{localStorage.setItem("abe_picks",JSON.stringify(p));Object.assign(_picks_store,p);}catch{Object.assign(_picks_store,p);}}

// ─── ASK ABE AI ──────────────────────────────────────────────────────────────
async function askAbeAI(name,question,history){
  const system=`You are Abe, a warm AI tools expert at "Discover AI with Abe." Help find perfect tools.
Tools: ${TOOLS.map(t=>`${t.name}(${t.category},${t.pricing}):${t.description}`).join(" | ")}
Be concise (3–5 sentences), specific, mention pricing. User name: ${name||"friend"}.`;
  const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system,messages:[...history,{role:"user",content:question}]})});
  const d=await res.json();
  return d.content?.[0]?.text||"Oops, try again!";
}

// ─── TOOL ICONS ──────────────────────────────────────────────────────────────
// Each tool gets a unique icon + brand color — fully works in any environment
const TOOL_ICONS = {
  // Writing
  "ChatGPT":           { icon:"󰧑", bg:"#10A37F", fg:"#fff", emoji:"🤖" },
  "Claude":            { icon:"✦",  bg:"#CC785C", fg:"#fff", emoji:"✦"  },
  "Jasper AI":         { icon:"J",  bg:"#FF5C35", fg:"#fff", emoji:"🟠" },
  "Copy.ai":           { icon:"©",  bg:"#8B5CF6", fg:"#fff", emoji:"✏️" },
  "Grammarly":         { icon:"G",  bg:"#15C39A", fg:"#fff", emoji:"📗" },
  "Writesonic":        { icon:"W",  bg:"#6366F1", fg:"#fff", emoji:"⚡" },
  "Wordtune":          { icon:"W",  bg:"#FF6B6B", fg:"#fff", emoji:"🔤" },
  "Quillbot":          { icon:"Q",  bg:"#2ECC71", fg:"#fff", emoji:"🪶" },
  "Notion AI":         { icon:"N",  bg:"#000000", fg:"#fff", emoji:"📋" },
  "Sudowrite":         { icon:"S",  bg:"#7C3AED", fg:"#fff", emoji:"✒️" },
  "Rytr":              { icon:"R",  bg:"#00D4AA", fg:"#fff", emoji:"📝" },
  "Hyperwrite":        { icon:"H",  bg:"#3B82F6", fg:"#fff", emoji:"🖊️" },
  "Anyword":           { icon:"A",  bg:"#F59E0B", fg:"#fff", emoji:"📢" },
  "Longshot AI":       { icon:"L",  bg:"#EF4444", fg:"#fff", emoji:"🎯" },
  "Ink Editor":        { icon:"I",  bg:"#8B5CF6", fg:"#fff", emoji:"🖋️" },
  "Peppertype":        { icon:"P",  bg:"#F97316", fg:"#fff", emoji:"🌶️" },
  // Image
  "Midjourney":        { icon:"M",  bg:"#000000", fg:"#fff", emoji:"🎨" },
  "DALL·E 3":          { icon:"D",  bg:"#10A37F", fg:"#fff", emoji:"🖼️" },
  "Stable Diffusion":  { icon:"SD", bg:"#1C1C2E", fg:"#a78bfa", emoji:"🌀" },
  "Adobe Firefly":     { icon:"Ff", bg:"#FF0000", fg:"#fff", emoji:"🔥" },
  "Leonardo AI":       { icon:"L",  bg:"#7B2FBE", fg:"#fff", emoji:"🦁" },
  "Ideogram":          { icon:"i",  bg:"#000000", fg:"#fff", emoji:"💬" },
  "Canva AI":          { icon:"C",  bg:"#00C4CC", fg:"#fff", emoji:"🖌️" },
  "Recraft":           { icon:"R",  bg:"#5B21B6", fg:"#fff", emoji:"🔷" },
  "Luma AI":           { icon:"L",  bg:"#000000", fg:"#fff", emoji:"💡" },
  "Flux":              { icon:"F",  bg:"#18181B", fg:"#a3e635", emoji:"⚡" },
  "Playground AI":     { icon:"P",  bg:"#7C3AED", fg:"#fff", emoji:"🛝" },
  "Artbreeder":        { icon:"A",  bg:"#EC4899", fg:"#fff", emoji:"🧬" },
  "NightCafe":         { icon:"N",  bg:"#1E1B4B", fg:"#818CF8", emoji:"🌙" },
  "Bing Image Creator":{ icon:"B",  bg:"#0078D4", fg:"#fff", emoji:"🔵" },
  "Remove.bg":         { icon:"R",  bg:"#00D084", fg:"#fff", emoji:"✂️" },
  "Clipdrop":          { icon:"C",  bg:"#6D28D9", fg:"#fff", emoji:"✂️" },
  "Krea AI":           { icon:"K",  bg:"#000000", fg:"#fff", emoji:"🎭" },
  "Pixlr AI":          { icon:"P",  bg:"#0099FF", fg:"#fff", emoji:"📸" },
  // Video
  "Runway ML":         { icon:"R",  bg:"#000000", fg:"#fff", emoji:"🎬" },
  "Sora":              { icon:"S",  bg:"#10A37F", fg:"#fff", emoji:"🎥" },
  "Kling AI":          { icon:"K",  bg:"#FF4D00", fg:"#fff", emoji:"🎞️" },
  "HeyGen":            { icon:"H",  bg:"#5B4CF5", fg:"#fff", emoji:"👤" },
  "Synthesia":         { icon:"S",  bg:"#0047FF", fg:"#fff", emoji:"🎭" },
  "Pika Labs":         { icon:"P",  bg:"#FF3366", fg:"#fff", emoji:"✨" },
  "Descript":          { icon:"D",  bg:"#FF4F00", fg:"#fff", emoji:"🎙️" },
  "Captions AI":       { icon:"C",  bg:"#000000", fg:"#fff", emoji:"💬" },
  "Luma Dream Machine":{ icon:"L",  bg:"#000000", fg:"#fff", emoji:"🌌" },
  "Invideo AI":        { icon:"I",  bg:"#7B2FBE", fg:"#fff", emoji:"📹" },
  "Pictory":           { icon:"P",  bg:"#FF6B35", fg:"#fff", emoji:"🖼️" },
  "Opus Clip":         { icon:"O",  bg:"#FF3C00", fg:"#fff", emoji:"✂️" },
  "Veed.io":           { icon:"V",  bg:"#00D4FF", fg:"#000", emoji:"▶️" },
  "Fliki":             { icon:"F",  bg:"#A855F7", fg:"#fff", emoji:"🎵" },
  "Topaz Video AI":    { icon:"T",  bg:"#1A1A2E", fg:"#00D4C8", emoji:"📽️" },
  "Steve AI":          { icon:"S",  bg:"#FF5757", fg:"#fff", emoji:"🤖" },
  // Coding
  "GitHub Copilot":    { icon:"⌥",  bg:"#24292E", fg:"#fff", emoji:"🐙" },
  "Cursor":            { icon:"⌶",  bg:"#000000", fg:"#fff", emoji:"↗️" },
  "Replit AI":         { icon:"R",  bg:"#F26207", fg:"#fff", emoji:"🔁" },
  "Tabnine":           { icon:"T",  bg:"#6666FF", fg:"#fff", emoji:"⌨️" },
  "Codeium":           { icon:"C",  bg:"#09B6A2", fg:"#fff", emoji:"💚" },
  "Bolt.new":          { icon:"⚡",  bg:"#1C1C1C", fg:"#FFD700", emoji:"⚡" },
  "V0 by Vercel":      { icon:"v0", bg:"#000000", fg:"#fff", emoji:"▲" },
  "Windsurf":          { icon:"W",  bg:"#00B4D8", fg:"#fff", emoji:"🏄" },
  "Lovable":           { icon:"♥",  bg:"#FF3366", fg:"#fff", emoji:"❤️" },
  "Aider":             { icon:"A",  bg:"#2D2D2D", fg:"#00FF88", emoji:"🖥️" },
  "Sourcegraph Cody":  { icon:"S",  bg:"#A112FF", fg:"#fff", emoji:"🔭" },
  "Amazon Q Developer":{ icon:"Q",  bg:"#FF9900", fg:"#fff", emoji:"🟠" },
  "Pieces for Devs":   { icon:"P",  bg:"#1C1C2E", fg:"#00D4C8", emoji:"🧩" },
  "Continue.dev":      { icon:"C",  bg:"#1C1C1C", fg:"#fff", emoji:"⏩" },
  "Devin":             { icon:"D",  bg:"#6366F1", fg:"#fff", emoji:"🤖" },
  "Cosine Genie":      { icon:"G",  bg:"#7C3AED", fg:"#fff", emoji:"🧞" },
  // Audio
  "ElevenLabs":        { icon:"11", bg:"#000000", fg:"#fff", emoji:"🎙️" },
  "Murf AI":           { icon:"M",  bg:"#5B4CF5", fg:"#fff", emoji:"🔊" },
  "Suno AI":           { icon:"S",  bg:"#000000", fg:"#fff", emoji:"🎵" },
  "Udio":              { icon:"U",  bg:"#1C1C1C", fg:"#fff", emoji:"🎶" },
  "Soundraw":          { icon:"S",  bg:"#FF4081", fg:"#fff", emoji:"🎸" },
  "Adobe Podcast":     { icon:"Ap", bg:"#FF0000", fg:"#fff", emoji:"🎤" },
  "Podcastle":         { icon:"P",  bg:"#6C47FF", fg:"#fff", emoji:"🏰" },
  "Resemble AI":       { icon:"R",  bg:"#FF6B6B", fg:"#fff", emoji:"🎭" },
  "Lalal.ai":          { icon:"L",  bg:"#00D4AA", fg:"#fff", emoji:"🎼" },
  "Aiva":              { icon:"A",  bg:"#1A1A2E", fg:"#818CF8", emoji:"🎹" },
  "Boomy":             { icon:"B",  bg:"#FF3CAC", fg:"#fff", emoji:"🎤" },
  "Play.ht":           { icon:"▶",  bg:"#6C47FF", fg:"#fff", emoji:"▶️" },
  "Cleanvoice AI":     { icon:"C",  bg:"#00B4D8", fg:"#fff", emoji:"🎙️" },
  // Research
  "Perplexity AI":     { icon:"P",  bg:"#20B2AA", fg:"#fff", emoji:"🔍" },
  "Gemini":            { icon:"G",  bg:"#4285F4", fg:"#fff", emoji:"💎" },
  "Elicit":            { icon:"E",  bg:"#7C3AED", fg:"#fff", emoji:"🔬" },
  "Consensus":         { icon:"C",  bg:"#0EA5E9", fg:"#fff", emoji:"📊" },
  "NotebookLM":        { icon:"N",  bg:"#4285F4", fg:"#fff", emoji:"📓" },
  "Scite":             { icon:"S",  bg:"#1E40AF", fg:"#fff", emoji:"📑" },
  "You.com":           { icon:"Y",  bg:"#C026D3", fg:"#fff", emoji:"🔎" },
  "Semantic Scholar":  { icon:"S",  bg:"#C41E3A", fg:"#fff", emoji:"📚" },
  "Explainpaper":      { icon:"E",  bg:"#7C3AED", fg:"#fff", emoji:"📄" },
  "Humata AI":         { icon:"H",  bg:"#FF6B35", fg:"#fff", emoji:"💬" },
  "Typeset.io":        { icon:"T",  bg:"#0EA5E9", fg:"#fff", emoji:"📝" },
  "Scholarcy":         { icon:"S",  bg:"#10B981", fg:"#fff", emoji:"🎓" },
  // Business
  "Zapier AI":         { icon:"Z",  bg:"#FF4A00", fg:"#fff", emoji:"⚙️" },
  "Fathom":            { icon:"F",  bg:"#6366F1", fg:"#fff", emoji:"📊" },
  "Otter.ai":          { icon:"O",  bg:"#3B82F6", fg:"#fff", emoji:"🦦" },
  "Fireflies.ai":      { icon:"F",  bg:"#7C3AED", fg:"#fff", emoji:"🦋" },
  "Gamma":             { icon:"γ",  bg:"#FF4D6D", fg:"#fff", emoji:"📐" },
  "Tome":              { icon:"T",  bg:"#6D28D9", fg:"#fff", emoji:"📖" },
  "Beautiful.ai":      { icon:"B",  bg:"#FF3366", fg:"#fff", emoji:"✨" },
  "HubSpot AI":        { icon:"H",  bg:"#FF7A59", fg:"#fff", emoji:"🟠" },
  "Lavender":          { icon:"L",  bg:"#7C3AED", fg:"#fff", emoji:"💜" },
  "Gong AI":           { icon:"G",  bg:"#5B4CF5", fg:"#fff", emoji:"📞" },
  "Tidio AI":          { icon:"T",  bg:"#1FB6FF", fg:"#fff", emoji:"💬" },
  "Klaviyo AI":        { icon:"K",  bg:"#000000", fg:"#fff", emoji:"📧" },
  "Intercom Fin":      { icon:"I",  bg:"#1F8DED", fg:"#fff", emoji:"💬" },
  // Productivity
  "Mem.ai":            { icon:"M",  bg:"#000000", fg:"#fff", emoji:"🧠" },
  "Taskade":           { icon:"T",  bg:"#7C3AED", fg:"#fff", emoji:"✅" },
  "Motion":            { icon:"M",  bg:"#6366F1", fg:"#fff", emoji:"📅" },
  "Reclaim AI":        { icon:"R",  bg:"#00D4C8", fg:"#000", emoji:"⏰" },
  "Raycast AI":        { icon:"R",  bg:"#FF6363", fg:"#fff", emoji:"🚀" },
  "Tana":              { icon:"T",  bg:"#1C1C1C", fg:"#fff", emoji:"🌿" },
  "Superhuman AI":     { icon:"S",  bg:"#FF4D4D", fg:"#fff", emoji:"⚡" },
  "Merlin AI":         { icon:"M",  bg:"#6C47FF", fg:"#fff", emoji:"🧙" },
  "Heptabase":         { icon:"H",  bg:"#FFB800", fg:"#000", emoji:"🗂️" },
  "Reflect Notes":     { icon:"R",  bg:"#1C1C2E", fg:"#818CF8", emoji:"🪞" },
  // Design
  "Figma AI":          { icon:"F",  bg:"#F24E1E", fg:"#fff", emoji:"🎯" },
  "Galileo AI":        { icon:"G",  bg:"#6366F1", fg:"#fff", emoji:"🔭" },
  "Uizard":            { icon:"U",  bg:"#FF3366", fg:"#fff", emoji:"📱" },
  "Looka":             { icon:"L",  bg:"#000000", fg:"#fff", emoji:"🏷️" },
  "Khroma":            { icon:"K",  bg:"#FF6B6B", fg:"#fff", emoji:"🎨" },
  "Framer AI":         { icon:"F",  bg:"#0055FF", fg:"#fff", emoji:"🖥️" },
  "Spline AI":         { icon:"S",  bg:"#000000", fg:"#fff", emoji:"🔮" },
  "Magician for Figma":{ icon:"M",  bg:"#9333EA", fg:"#fff", emoji:"🪄" },
  "Autodraw":          { icon:"A",  bg:"#4285F4", fg:"#fff", emoji:"✏️" },
  "Visily":            { icon:"V",  bg:"#7C3AED", fg:"#fff", emoji:"📐" },
  "Google AI Studio":  { icon:"AI", bg:"#4285F4", fg:"#fff", emoji:"🧪" },
};

function Logo({ src, name, size=48, catColor }) {
  const meta = TOOL_ICONS[name];
  const bg   = meta?.bg  || catColor;
  const fg   = meta?.fg  || "#fff";
  const icon = meta?.icon || name.slice(0,2);

  return (
    <div style={{
      width:size, height:size,
      borderRadius:size*0.22,
      flexShrink:0,
      background:bg,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      boxShadow:`0 2px 10px ${bg}55`,
      border:"1.5px solid rgba(255,255,255,0.12)",
      overflow:"hidden",
    }}>
      <span style={{
        fontFamily:"'Space Grotesk',sans-serif",
        fontWeight:900,
        fontSize: icon.length > 2 ? size*0.28 : icon.length===2 ? size*0.34 : size*0.44,
        color:fg,
        letterSpacing:"-0.04em",
        lineHeight:1,
        userSelect:"none",
      }}>{icon}</span>
    </div>
  );
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const G = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{background:${dark?"#030308":"#F0F4F8"};transition:background .3s;-webkit-font-smoothing:antialiased}
  input,textarea{font-family:'Inter',sans-serif;color-scheme:${dark?"dark":"light"}}
  input::placeholder,textarea::placeholder{color:${dark?"#3a3a4a":"#aaa"}}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(0,212,200,.25);border-radius:10px}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
  @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
  @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
  .fu{animation:fadeUp .7s cubic-bezier(.4,0,.2,1) both}
  .fu2{animation:fadeUp .7s .12s cubic-bezier(.4,0,.2,1) both}
  .fu3{animation:fadeUp .7s .24s cubic-bezier(.4,0,.2,1) both}
  @keyframes ringPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:0;transform:scale(1.18)}}
  @media(max-width:640px){
    .desktop-only{display:none!important}
    .mobile-only{display:flex!important}
    .grid-2col{grid-template-columns:1fr!important}
    .footer-grid{grid-template-columns:1fr 1fr!important;gap:32px!important}
    .hero-pad{padding:80px 16px 40px!important}
    .section-pad{padding:0 16px 80px!important}
    .cat-bar{padding:10px 12px!important}
    .contact-grid{grid-template-columns:1fr 1fr!important}
  }
  @media(max-width:400px){
    .footer-grid{grid-template-columns:1fr!important}
    .contact-grid{grid-template-columns:1fr!important}
  }
`;

const Orb=({s})=><div style={{position:"absolute",borderRadius:"50%",filter:"blur(100px)",opacity:.13,pointerEvents:"none",...s}}/>;

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({page,setPage,dark,setDark,picksCount}){
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>10);
    window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);
  },[]);

  const links=[
    {p:"home",  label:"Home"},
    {p:"picks", label:"My Picks", badge:picksCount},
    {p:"ask",   label:"Ask Abe"},
  ];

  return(
    <header style={{
      position:"fixed",top:0,left:0,right:0,zIndex:999,
      background:scrolled?(dark?"rgba(3,3,8,0.92)":"rgba(245,247,250,0.92)"):"transparent",
      backdropFilter:scrolled?"blur(24px) saturate(180%)":"none",
      WebkitBackdropFilter:scrolled?"blur(24px) saturate(180%)":"none",
      borderBottom:scrolled?`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}`:"none",
      transition:"all .35s cubic-bezier(.4,0,.2,1)",
    }}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 20px",height:62,
        display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>

        {/* ── Brand ── */}
        <div onClick={()=>{setPage("home");setMenuOpen(false);}} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer",userSelect:"none",flexShrink:0}}>
          <div style={{width:34,height:34,borderRadius:10,flexShrink:0,
            background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,
            boxShadow:"0 4px 14px rgba(0,212,200,0.35)"}}>✨</div>
          <div style={{display:"flex",alignItems:"baseline",gap:4}}>
            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:15,
              color:dark?"#fff":"#0A0A0F",letterSpacing:"-.02em"}}>Discover AI</span>
            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
              color:"#00D4C8",letterSpacing:"-.01em"}} className="desktop-only">with Abe</span>
          </div>
        </div>

        {/* ── Desktop pill nav ── */}
        <nav className="desktop-only" style={{
          display:"flex",alignItems:"center",gap:1,
          background:dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)",
          border:`1px solid ${dark?"rgba(255,255,255,0.09)":"rgba(0,0,0,0.09)"}`,
          borderRadius:14,padding:"4px",
        }}>
          {links.map(({p,label,badge})=>{
            const active=page===p;
            return(
              <button key={p} onClick={()=>setPage(p)} style={{
                position:"relative",
                background:active?(dark?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.95)"):"transparent",
                border:"none",borderRadius:10,padding:"7px 16px",
                fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:13,
                color:active?(dark?"#fff":"#0A0A0F"):dark?"rgba(255,255,255,0.42)":"rgba(0,0,0,0.38)",
                cursor:"pointer",transition:"all .22s",
                boxShadow:active&&!dark?"0 2px 10px rgba(0,0,0,0.12)":"none",
              }}
              onMouseEnter={e=>{if(!active)e.currentTarget.style.color=dark?"rgba(255,255,255,0.82)":"rgba(0,0,0,0.7)";}}
              onMouseLeave={e=>{if(!active)e.currentTarget.style.color=dark?"rgba(255,255,255,0.42)":"rgba(0,0,0,0.38)";}}
              >
                {label}
                {badge>0&&<span style={{
                  position:"absolute",top:2,right:2,
                  background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
                  color:"#fff",borderRadius:"50%",
                  width:15,height:15,fontSize:8,fontWeight:800,
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>{badge}</span>}
              </button>
            );
          })}
        </nav>

        {/* ── Right controls ── */}
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          {/* Dark toggle */}
          <button onClick={()=>setDark(!dark)} style={{
            width:36,height:36,
            background:dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.06)",
            border:`1px solid ${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
            borderRadius:10,cursor:"pointer",transition:"all .2s",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,
          }}>{dark?"☀️":"🌙"}</button>

          {/* Hamburger - mobile only */}
          <button onClick={()=>setMenuOpen(m=>!m)} style={{
            width:36,height:36,
            background:menuOpen?"rgba(0,212,200,0.12)":"transparent",
            border:`1px solid ${menuOpen?"rgba(0,212,200,0.3)":dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
            borderRadius:10,cursor:"pointer",transition:"all .2s",
            display:"none",alignItems:"center",justifyContent:"center",
            flexDirection:"column",gap:4,padding:"10px 8px",
          }} className="mobile-only">
            <span style={{display:"block",width:16,height:1.5,background:menuOpen?"#00D4C8":dark?"#fff":"#000",
              transition:"all .25s",transform:menuOpen?"rotate(45deg) translate(4px,4px)":"none"}}/>
            <span style={{display:"block",width:16,height:1.5,background:menuOpen?"#00D4C8":dark?"#fff":"#000",
              transition:"all .25s",opacity:menuOpen?0:1}}/>
            <span style={{display:"block",width:16,height:1.5,background:menuOpen?"#00D4C8":dark?"#fff":"#000",
              transition:"all .25s",transform:menuOpen?"rotate(-45deg) translate(4px,-4px)":"none"}}/>
          </button>
        </div>
      </div>

      {/* ── Mobile menu dropdown ── */}
      {menuOpen&&(
        <div style={{
          background:dark?"rgba(3,3,8,0.98)":"rgba(248,249,252,0.98)",
          backdropFilter:"blur(20px)",
          borderTop:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)"}`,
          padding:"12px 16px 20px",
        }}>
          {links.map(({p,label,badge})=>(
            <button key={p} onClick={()=>{setPage(p);setMenuOpen(false);}} style={{
              display:"flex",alignItems:"center",justifyContent:"space-between",
              width:"100%",background:page===p?"rgba(0,212,200,0.1)":"transparent",
              border:"none",borderRadius:12,padding:"13px 16px",marginBottom:4,
              fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15,
              color:page===p?"#00D4C8":dark?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.7)",
              cursor:"pointer",textAlign:"left",
            }}>
              {label}
              {badge>0&&<span style={{
                background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
                color:"#fff",borderRadius:100,padding:"2px 9px",
                fontSize:11,fontWeight:800,
              }}>{badge}</span>}
            </button>
          ))}
          <button onClick={()=>{setPage("contact");setMenuOpen(false);}} style={{
            display:"flex",alignItems:"center",
            width:"100%",background:"rgba(0,212,200,0.08)",
            border:"1px solid rgba(0,212,200,0.2)",borderRadius:12,padding:"13px 16px",marginTop:8,
            fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15,
            color:"#00D4C8",cursor:"pointer",gap:8,
          }}>📬 Contact Abe</button>
        </div>
      )}

      {/* Bottom glow line */}
      <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",
        width:"55%",height:1,transition:"all .4s",
        background:scrolled?"linear-gradient(90deg,transparent,rgba(0,212,200,0.35),transparent)":"transparent"}}/>
    </header>
  );
}

// ─── TOOL CARD ────────────────────────────────────────────────────────────────
function ToolCard({tool,dark,picks,setPicks}){
  const [hov,setHov]=useState(false);
  const [showNote,setShowNote]=useState(false);
  const [note,setNote]=useState("");
  const picked=!!picks[tool.id];
  const color=CAT_META[tool.category]?.color||"#00D4C8";

  const togglePick=(e)=>{
    e.stopPropagation();
    if(picked){const n={...picks};delete n[tool.id];setPicks(n);savePicks(n);setShowNote(false);}
    else setShowNote(true);
  };
  const doSave=(e)=>{
    e.stopPropagation();
    const n={...picks,[tool.id]:{toolId:tool.id,name:tool.name,category:tool.category,note,savedAt:Date.now()}};
    setPicks(n);savePicks(n);setShowNote(false);setNote("");
  };

  return(
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onClick={()=>window.open(tool.url,"_blank")}
      style={{
        background:dark?(hov?"rgba(22,22,35,0.98)":"rgba(12,12,20,0.85)"):(hov?"rgba(255,255,255,1)":"rgba(255,255,255,0.78)"),
        border:`1px solid ${hov?color+"60":dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`,
        borderRadius:20,padding:"22px 22px 18px",
        backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
        transform:hov?"translateY(-4px)":"none",
        boxShadow:hov?`0 20px 60px ${color}15,0 4px 24px rgba(0,0,0,0.2)`
          :dark?"0 2px 20px rgba(0,0,0,0.35)":"0 2px 16px rgba(0,0,0,0.07)",
        transition:"all .3s cubic-bezier(.4,0,.2,1)",
        position:"relative",overflow:"hidden",cursor:"pointer",
      }}>

      {/* Gradient shimmer top border */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,
        background:`linear-gradient(90deg,transparent 0%,${color} 50%,transparent 100%)`,
        opacity:hov?1:0,transition:"opacity .35s"}}/>

      {tool.featured&&<div style={{
        position:"absolute",top:15,right:15,
        background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
        borderRadius:7,padding:"3px 9px",
        fontSize:9,fontWeight:800,color:"#fff",letterSpacing:".08em",
        fontFamily:"'Space Grotesk',sans-serif",
        boxShadow:"0 2px 10px rgba(0,212,200,0.3)",
      }}>✦ TOP PICK</div>}

      {/* Header row: logo + name */}
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
        <Logo src={tool.logo} name={tool.name} size={50} catColor={color}/>
        <div style={{flex:1,minWidth:0}}>
          <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15.5,
            color:dark?"#f0f0f8":"#0A0A0F",marginBottom:5,
            overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tool.name}</h3>
          <span style={{
            display:"inline-flex",alignItems:"center",gap:4,
            background:`${color}18`,color,
            borderRadius:7,padding:"3px 9px",
            fontSize:10,fontWeight:700,letterSpacing:".05em",
            fontFamily:"'Space Grotesk',sans-serif",
          }}>
            {CAT_META[tool.category]?.icon} {tool.category.toUpperCase()}
          </span>
        </div>
      </div>

      <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,lineHeight:1.68,
        color:dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.55)",marginBottom:16,
        display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{tool.description}</p>

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"auto"}}>
        <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:11.5,fontWeight:600,
          color:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.35)"}}>💰 {tool.pricing}</span>
        <div style={{display:"flex",gap:7,alignItems:"center"}} onClick={e=>e.stopPropagation()}>
          <button onClick={togglePick} style={{
            background:picked?`${color}18`:"transparent",
            border:`1px solid ${picked?color:dark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.12)"}`,
            borderRadius:8,padding:"5px 11px",
            fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
            color:picked?color:dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.35)",
            cursor:"pointer",transition:"all .2s",
          }}>{picked?"★ Saved":"☆ Save"}</button>
        </div>
      </div>

      {/* Note overlay */}
      {showNote&&(
        <div onClick={e=>e.stopPropagation()} style={{
          position:"absolute",inset:0,borderRadius:20,
          background:dark?"rgba(8,8,16,0.97)":"rgba(255,255,255,0.98)",
          backdropFilter:"blur(16px)",
          display:"flex",flexDirection:"column",padding:22,gap:12,
          border:`1px solid ${color}45`,
          boxShadow:`0 0 40px ${color}20`,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Logo src={tool.logo} name={tool.name} size={32} catColor={color}/>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,
              color:dark?"#fff":"#0A0A0F"}}>Why do you love {tool.name}?</p>
          </div>
          <textarea autoFocus value={note} onChange={e=>setNote(e.target.value)}
            placeholder="Add a note or review (optional)..." rows={3}
            style={{background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",
              border:`1px solid ${color}30`,borderRadius:10,padding:"10px 14px",
              resize:"none",fontFamily:"'Inter',sans-serif",fontSize:13,
              color:dark?"#ddd":"#333",outline:"none"}}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={doSave} style={{flex:1,background:`linear-gradient(135deg,#00D4C8,#7C3AED)`,
              border:"none",borderRadius:9,padding:"10px",
              fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:13,
              color:"#fff",cursor:"pointer",boxShadow:"0 4px 16px rgba(0,212,200,0.25)"}}>Save ★</button>
            <button onClick={()=>setShowNote(false)} style={{background:"transparent",
              border:`1px solid ${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
              borderRadius:9,padding:"10px 14px",fontFamily:"'Space Grotesk',sans-serif",
              fontSize:13,color:dark?"#555":"#aaa",cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CATEGORY PILL ───────────────────────────────────────────────────────────
function CategoryPill({label,icon,color,active,dark,onClick,count}){
  const [hov,setHov]=useState(false);
  const on=active||hov;
  return(
    <button
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        position:"relative",overflow:"hidden",
        background:on?`${color}18`:(dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"),
        border:`1.5px solid ${on?color+"65":dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.07)"}`,
        borderRadius:100,padding:"0",
        cursor:"pointer",
        transform:hov&&!active?"translateY(-3px) scale(1.06)":active?"scale(1.04)":"translateY(0) scale(1)",
        boxShadow:on?`0 6px 24px ${color}30,0 0 0 0px ${color}20`:"0 2px 8px rgba(0,0,0,0.08)",
        transition:"all .22s cubic-bezier(.34,1.56,.64,1)",
      }}>

      {/* Animated shimmer sweep on hover */}
      <div style={{
        position:"absolute",top:0,left:"-100%",width:"60%",height:"100%",
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)",
        transform:hov?"translateX(350%)":"translateX(0)",
        transition:hov?"transform .55s ease":"none",
        pointerEvents:"none",
      }}/>

      {/* Glow ring pulse on active */}
      {active&&<div style={{
        position:"absolute",inset:-2,borderRadius:100,
        border:`2px solid ${color}`,
        animation:"ringPulse 1.8s ease-in-out infinite",
        pointerEvents:"none",
      }}/>}

      <div style={{
        display:"flex",alignItems:"center",gap:6,
        padding:"7px 16px",position:"relative",zIndex:1,
      }}>
        {/* Icon bounces on hover */}
        <span style={{
          fontSize:14,lineHeight:1,display:"inline-block",
          transform:hov?"rotate(-8deg) scale(1.25)":"rotate(0) scale(1)",
          transition:"transform .25s cubic-bezier(.34,1.56,.64,1)",
        }}>{icon}</span>

        <span style={{
          fontFamily:"'Space Grotesk',sans-serif",
          fontWeight:on?700:600,fontSize:12.5,
          color:on?color:dark?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.45)",
          letterSpacing:"-.01em",
          transition:"color .18s,font-weight .18s",
          whiteSpace:"nowrap",
        }}>{label}</span>

        {/* Count badge slides in on hover */}
        <span style={{
          background:on?color:"transparent",
          color:on?"#000":"transparent",
          borderRadius:100,padding:"1px 7px",
          fontSize:10,fontWeight:800,
          fontFamily:"'Space Grotesk',sans-serif",
          transform:hov||active?"scale(1)":"scale(0.6)",
          opacity:hov||active?1:0,
          transition:"all .2s cubic-bezier(.34,1.56,.64,1)",
          display:"inline-block",minWidth:20,textAlign:"center",
        }}>{count}</span>
      </div>
    </button>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({dark,setPage,picks,setPicks}){
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("All");

  const filtered=TOOLS.filter(t=>{
    const mc=cat==="All"||t.category===cat;
    const ms=!search||[t.name,t.description,t.category].some(s=>s.toLowerCase().includes(search.toLowerCase()));
    return mc&&ms;
  });

  return(
    <div style={{minHeight:"100vh"}}>

      {/* ── HERO ── */}
      <div style={{position:"relative",minHeight:"92vh",display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",padding:"100px 20px 60px",overflow:"hidden"}}>

        <Orb s={{width:700,height:700,top:-200,left:-200,background:"#00D4C8"}}/>
        <Orb s={{width:500,height:500,top:100,right:-180,background:"#7C3AED"}}/>
        <Orb s={{width:400,height:400,bottom:-80,left:"40%",background:"#00D4C8",opacity:.08}}/>

        {/* Grid dots background */}
        <div style={{position:"absolute",inset:0,
          backgroundImage:`radial-gradient(${dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)"} 1px,transparent 1px)`,
          backgroundSize:"32px 32px",pointerEvents:"none"}}/>

        <div className="fu" style={{textAlign:"center",maxWidth:820,position:"relative",zIndex:2}}>

          {/* Badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:8,
            background:dark?"rgba(0,212,200,0.08)":"rgba(0,212,200,0.1)",
            border:"1px solid rgba(0,212,200,0.25)",
            borderRadius:100,padding:"6px 18px",marginBottom:32}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:"#00D4C8",
              display:"inline-block",animation:"pulse 2s infinite"}}/>
            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:12.5,
              color:"#00D4C8",fontWeight:600,letterSpacing:".02em"}}>
              {TOOLS.length} AI tools · {CATEGORIES.length-1} categories · Always free
            </span>
          </div>

          {/* Headline */}
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,
            fontSize:"clamp(42px,7.5vw,88px)",lineHeight:1.05,margin:"0 0 22px",
            letterSpacing:"-.03em",color:dark?"#f0f0f8":"#080810"}}>
            Find the right<br/>
            <span style={{position:"relative",display:"inline-block"}}>
              <span style={{background:"linear-gradient(135deg,#00D4C8 0%,#7C3AED 60%,#EC4899 100%)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AI tool</span>
            </span>
            {" "}for you
          </h1>

          {/* Subtext */}
          <p className="fu2" style={{fontFamily:"'Inter',sans-serif",
            fontSize:"clamp(15px,2vw,19px)",color:dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)",
            lineHeight:1.7,margin:"0 0 44px",maxWidth:560,marginLeft:"auto",marginRight:"auto"}}>
            The most curated directory of AI tools — honest pricing, real descriptions, and Abe's personal picks.
          </p>

          {/* Search bar */}
          <div className="fu3" style={{position:"relative",maxWidth:580,margin:"0 auto 20px"}}>
            <div style={{position:"absolute",left:20,top:"50%",transform:"translateY(-50%)",
              fontSize:18,opacity:.5,pointerEvents:"none"}}>🔍</div>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search tools, use cases, or categories..."
              style={{
                width:"100%",padding:"19px 22px 19px 54px",
                background:dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.95)",
                border:`1.5px solid ${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
                borderRadius:16,outline:"none",
                fontFamily:"'Inter',sans-serif",fontSize:15.5,
                color:dark?"#f0f0f8":"#080810",
                backdropFilter:"blur(20px)",
                boxShadow:dark?"0 8px 32px rgba(0,0,0,0.4)":"0 8px 32px rgba(0,0,0,0.08)",
                transition:"all .25s",
              }}
              onFocus={e=>{e.target.style.borderColor="#00D4C8";e.target.style.boxShadow="0 8px 40px rgba(0,212,200,0.2)";}}
              onBlur={e=>{e.target.style.borderColor=dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)";e.target.style.boxShadow=dark?"0 8px 32px rgba(0,0,0,0.4)":"0 8px 32px rgba(0,0,0,0.08)";}}
            />
            {search&&<button onClick={()=>setSearch("")} style={{
              position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",
              background:"transparent",border:"none",cursor:"pointer",
              color:dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.3)",fontSize:18}}>✕</button>}
          </div>

          {/* CTA */}
          <button onClick={()=>setPage("ask")} style={{
            background:"linear-gradient(135deg,#00D4C8,#7C3AED)",border:"none",
            borderRadius:100,padding:"13px 30px",
            fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14.5,
            color:"#fff",cursor:"pointer",
            boxShadow:"0 8px 32px rgba(0,212,200,0.3)",
            transition:"transform .2s,box-shadow .2s",letterSpacing:"-.01em"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 14px 44px rgba(0,212,200,0.45)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 8px 32px rgba(0,212,200,0.3)"}}>
            ✨ Not sure? Ask Abe for a recommendation
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:.3}}>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:11,
            color:dark?"#fff":"#000",letterSpacing:".1em"}}>EXPLORE</div>
          <div style={{width:1,height:32,background:dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.3)"}}/>
        </div>
      </div>

      {/* ── CATEGORY FILTER ── */}
      <div style={{
        position:"sticky",top:62,zIndex:10,
        background:dark?"rgba(3,3,8,0.92)":"rgba(245,247,250,0.92)",
        backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
        borderBottom:`1px solid ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)"}`,
        padding:"12px 16px",overflowX:"auto",
      }}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",minWidth:"max-content",margin:"0 auto"}}>
            {CATEGORIES.map(c=>{
              const active=cat===c;
              const color=CAT_META[c]?.color||"#00D4C8";
              const icon=CAT_META[c]?.icon||"";
              return(
                <CategoryPill key={c} label={c} icon={icon} color={color}
                  active={active} dark={dark} onClick={()=>setCat(c)}
                  count={c==="All"?TOOLS.length:TOOLS.filter(t=>t.category===c).length}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Count */}
      <div style={{textAlign:"center",padding:"18px 24px 8px",
        fontFamily:"'Inter',sans-serif",fontSize:13,
        color:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)"}}>
        Showing <strong style={{color:"#00D4C8"}}>{filtered.length}</strong> tools
        {search&&` matching "${search}"`}{cat!=="All"&&` in ${cat}`}
      </div>

      {/* ── GRID ── */}
      <div style={{padding:"16px 16px 100px",maxWidth:1200,margin:"0 auto"}}>
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"80px 0"}}>
            <div style={{fontSize:48,marginBottom:16}}>🤔</div>
            <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,
              color:dark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.3)",marginBottom:20}}>No tools found</p>
            <button onClick={()=>setPage("ask")} style={{
              background:"linear-gradient(135deg,#00D4C8,#7C3AED)",border:"none",
              borderRadius:100,padding:"12px 28px",color:"#fff",
              fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>Ask Abe</button>
          </div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(310px,100%),1fr))",gap:14}}>
            {filtered.map(t=><ToolCard key={t.id} tool={t} dark={dark} picks={picks} setPicks={setPicks}/>)}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)"}`,
        background:dark?"rgba(3,3,8,0.97)":"rgba(15,15,25,1)",
        padding:"48px 20px 28px",
      }}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>

          {/* Top section */}
          <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:48}}>

            {/* Brand col */}
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <div style={{width:36,height:36,borderRadius:10,flexShrink:0,
                  background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,
                  boxShadow:"0 4px 16px rgba(0,212,200,0.3)"}}>✨</div>
                <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:16,
                  color:"#fff",letterSpacing:"-.02em"}}>Discover AI with Abe</span>
              </div>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,lineHeight:1.75,
                color:"rgba(255,255,255,0.35)",marginBottom:24,maxWidth:260}}>
                The most curated directory of AI tools — honest pricing, real descriptions, and Abe's personal picks. Always free.
              </p>
              {/* Social / contact badge */}
              <button onClick={()=>setPage("contact")} style={{
                display:"inline-flex",alignItems:"center",gap:8,
                background:"rgba(0,212,200,0.1)",border:"1px solid rgba(0,212,200,0.25)",
                borderRadius:100,padding:"8px 18px",cursor:"pointer",transition:"all .2s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,212,200,0.18)";e.currentTarget.style.borderColor="rgba(0,212,200,0.5)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,212,200,0.1)";e.currentTarget.style.borderColor="rgba(0,212,200,0.25)";}}>
                <span style={{fontSize:14}}>📬</span>
                <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
                  color:"#00D4C8",letterSpacing:".02em"}}>Get in touch</span>
              </button>
            </div>

            {/* Explore col */}
            <div>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:11,
                color:"rgba(255,255,255,0.25)",letterSpacing:".1em",marginBottom:16}}>EXPLORE</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {CATEGORIES.filter(c=>c!=="All").map(cat=>(
                  <button key={cat} onClick={()=>{setPage("home");}} style={{
                    background:"transparent",border:"none",textAlign:"left",padding:0,
                    fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,
                    color:"rgba(255,255,255,0.4)",cursor:"pointer",transition:"color .15s",
                    display:"flex",alignItems:"center",gap:7,
                  }}
                  onMouseEnter={e=>e.currentTarget.style.color="#00D4C8"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
                    <span style={{fontSize:12}}>{CAT_META[cat]?.icon}</span>{cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools col */}
            <div>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:11,
                color:"rgba(255,255,255,0.25)",letterSpacing:".1em",marginBottom:16}}>TOP PICKS</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {TOOLS.filter(t=>t.featured).slice(0,8).map(t=>(
                  <a key={t.id} href={t.url} target="_blank" rel="noreferrer" style={{
                    fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,
                    color:"rgba(255,255,255,0.4)",textDecoration:"none",transition:"color .15s",
                  }}
                  onMouseEnter={e=>e.currentTarget.style.color="#00D4C8"}
                  onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
                    {t.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Stats col */}
            <div>
              <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:11,
                color:"rgba(255,255,255,0.25)",letterSpacing:".1em",marginBottom:16}}>BY THE NUMBERS</p>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {[
                  {num:TOOLS.length+"+", label:"AI tools listed"},
                  {num:"10",             label:"categories covered"},
                  {num:"100%",           label:"free to use"},
                  {num:"0",              label:"ads, ever"},
                ].map(s=>(
                  <div key={s.label}>
                    <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:22,
                      background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
                      WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{s.num}</div>
                    <div style={{fontFamily:"'Inter',sans-serif",fontSize:12,
                      color:"rgba(255,255,255,0.3)",marginTop:1}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(0,212,200,0.2),transparent)",marginBottom:24}}/>

          {/* Bottom bar */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:"rgba(255,255,255,0.2)"}}>
              © 2025 Discover AI with Abe · Built with ❤️ for AI explorers everywhere
            </p>
            <div style={{display:"flex",gap:4}}>
              {["Privacy","Terms","Sitemap"].map(l=>(
                <span key={l} style={{fontFamily:"'Inter',sans-serif",fontSize:12,
                  color:"rgba(255,255,255,0.2)",padding:"0 8px",
                  borderRight:l!=="Sitemap"?"1px solid rgba(255,255,255,0.1)":"none"}}>{l}</span>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

// ─── MY PICKS ─────────────────────────────────────────────────────────────────
function MyPicksPage({dark,picks,setPicks,setPage}){
  const saved=TOOLS.filter(t=>picks[t.id]);
  const breakdown={};
  saved.forEach(t=>{breakdown[t.category]=(breakdown[t.category]||0)+1;});
  const remove=(id)=>{const n={...picks};delete n[id];setPicks(n);savePicks(n);};

  return(
    <div style={{minHeight:"100vh",padding:"88px 24px 120px",maxWidth:1000,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:44}}>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,
          fontSize:"clamp(30px,5vw,48px)",color:dark?"#f0f0f8":"#080810",marginBottom:10,letterSpacing:"-.02em"}}>
          My <span style={{background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Picks</span>
        </h1>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:15,
          color:dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)"}}>
          {saved.length>0?`${saved.length} tool${saved.length>1?"s":""} saved — your personal AI toolkit.`:"Browse tools and save your favorites."}
        </p>
      </div>
      {saved.length===0?(
        <div style={{textAlign:"center",padding:"60px 0"}}>
          <div style={{fontSize:52,marginBottom:16}}>⭐</div>
          <button onClick={()=>setPage("home")} style={{
            background:"linear-gradient(135deg,#00D4C8,#7C3AED)",border:"none",
            borderRadius:100,padding:"12px 28px",color:"#fff",
            fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>Browse Tools</button>
        </div>
      ):(
        <>
          {Object.keys(breakdown).length>1&&(
            <div style={{display:"flex",gap:9,flexWrap:"wrap",justifyContent:"center",marginBottom:32}}>
              {Object.entries(breakdown).map(([c,n])=>{
                const color=CAT_META[c]?.color||"#00D4C8";
                return(<div key={c} style={{background:`${color}12`,border:`1px solid ${color}30`,
                  borderRadius:100,padding:"6px 16px",
                  fontFamily:"'Space Grotesk',sans-serif",fontSize:12,fontWeight:700,color}}>
                  {CAT_META[c]?.icon} {c} · {n}</div>);
              })}
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
            {saved.map(t=>{
              const pick=picks[t.id];
              const color=CAT_META[t.category]?.color||"#00D4C8";
              return(
                <div key={t.id} style={{background:dark?"rgba(12,12,20,0.85)":"rgba(255,255,255,0.85)",
                  border:`1px solid ${color}30`,borderRadius:18,padding:22,
                  backdropFilter:"blur(18px)",position:"relative"}}>
                  <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
                    <Logo src={t.logo} name={t.name} size={44} catColor={color}/>
                    <div style={{flex:1}}>
                      <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15,
                        color:dark?"#f0f0f8":"#080810",marginBottom:3}}>{t.name}</h3>
                      <span style={{fontSize:10,fontWeight:700,color,
                        fontFamily:"'Space Grotesk',sans-serif",
                        background:`${color}15`,borderRadius:5,padding:"2px 7px"}}>{t.category}</span>
                    </div>
                    <button onClick={()=>remove(t.id)} style={{background:"transparent",border:"none",
                      fontSize:15,color:dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",cursor:"pointer",padding:4}}>✕</button>
                  </div>
                  {pick.note&&(
                    <div style={{background:"rgba(0,212,200,0.06)",border:"1px solid rgba(0,212,200,0.15)",
                      borderRadius:10,padding:"9px 13px",marginBottom:12}}>
                      <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,
                        color:dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)",lineHeight:1.5,fontStyle:"italic"}}>"{pick.note}"</p>
                    </div>
                  )}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:11,
                      fontWeight:600,color:dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.3)"}}>💰 {t.pricing}</span>
                    <a href={t.url} target="_blank" rel="noreferrer"
                      style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:12,fontWeight:700,color:"#00D4C8",textDecoration:"none"}}>Try it →</a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── ASK ABE ─────────────────────────────────────────────────────────────────
function AskAbePage({dark}){
  const [name,setName]=useState("");
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState(false);
  const [history,setHistory]=useState([]);
  const [started,setStarted]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages,loading]);

  const send=async()=>{
    if(!input.trim()||loading)return;
    const q=input.trim();setInput("");setStarted(true);
    setMessages(p=>[...p,{role:"user",text:q}]);setLoading(true);
    try{
      const reply=await askAbeAI(name,q,history);
      setMessages(p=>[...p,{role:"abe",text:reply}]);
      setHistory(h=>[...h,{role:"user",content:q},{role:"assistant",content:reply}]);
    }catch{setMessages(p=>[...p,{role:"abe",text:"Something went wrong. Try again!"}]);}
    finally{setLoading(false);}
  };

  const suggestions=["Best free AI tools for beginners","I want to make AI art cheaply",
    "Best AI for writing blogs?","Tools for making AI videos","AI for a small business","Best coding AI for VS Code"];

  return(
    <div style={{minHeight:"100vh",padding:"80px 16px 40px",maxWidth:740,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{width:72,height:72,borderRadius:20,margin:"0 auto 16px",
          background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,
          boxShadow:"0 12px 40px rgba(0,212,200,0.3)"}}>✨</div>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,
          fontSize:"clamp(28px,5vw,46px)",color:dark?"#f0f0f8":"#080810",margin:"0 0 10px",letterSpacing:"-.02em"}}>
          Ask <span style={{background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Abe</span>
        </h1>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:15,color:dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)"}}>
          Tell me what you want to do — I'll find your perfect AI tool.
        </p>
      </div>
      {!started&&<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name (optional)"
        style={{width:"100%",padding:"13px 17px",marginBottom:14,display:"block",
          background:dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.9)",
          border:`1px solid ${dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.09)"}`,
          borderRadius:12,outline:"none",fontSize:14,color:dark?"#f0f0f8":"#080810"}}/>}
      <div style={{background:dark?"rgba(12,12,20,0.6)":"rgba(255,255,255,0.65)",
        border:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)"}`,
        borderRadius:18,backdropFilter:"blur(18px)",minHeight:280,padding:20,marginBottom:14,maxHeight:440,overflowY:"auto"}}>
        {!started&&<div>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:12,
            color:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",marginBottom:12}}>Try asking:</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {suggestions.map(s=>(
              <button key={s} onClick={()=>setInput(s)} style={{
                background:"rgba(0,212,200,0.07)",border:"1px solid rgba(0,212,200,0.18)",
                borderRadius:100,padding:"7px 14px",fontFamily:"'Inter',sans-serif",
                fontSize:12,color:"#00D4C8",cursor:"pointer"}}>{s}</button>
            ))}
          </div>
        </div>}
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:14}}>
            {m.role==="abe"&&<div style={{width:30,height:30,borderRadius:9,flexShrink:0,
              background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:13,marginRight:9,marginTop:4}}>✨</div>}
            <div style={{maxWidth:"76%",
              background:m.role==="user"?"linear-gradient(135deg,#00D4C8,#7C3AED)":dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.05)",
              borderRadius:m.role==="user"?"17px 17px 4px 17px":"17px 17px 17px 4px",
              padding:"11px 15px",fontFamily:"'Inter',sans-serif",fontSize:14,lineHeight:1.65,
              color:m.role==="user"?"#fff":dark?"#ddd":"#333",whiteSpace:"pre-wrap"}}>{m.text}</div>
          </div>
        ))}
        {loading&&<div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:30,height:30,borderRadius:9,background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>✨</div>
          <div style={{background:dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.05)",
            borderRadius:"17px 17px 17px 4px",padding:"13px 16px",display:"flex",gap:5,alignItems:"center"}}>
            {[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:"#00D4C8",
              animation:`bounce 1.2s ease-in-out ${i*.15}s infinite`}}/>)}
          </div>
        </div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{display:"flex",gap:9}}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
          placeholder={started?"Ask a follow-up...":"What do you want to do with AI?"}
          style={{flex:1,padding:"15px 18px",
            background:dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.9)",
            border:`1px solid ${dark?"rgba(0,212,200,0.2)":"rgba(0,0,0,0.09)"}`,
            borderRadius:13,outline:"none",fontSize:14,color:dark?"#f0f0f8":"#080810"}}
          onFocus={e=>e.target.style.borderColor="#00D4C8"}
          onBlur={e=>e.target.style.borderColor=dark?"rgba(0,212,200,0.2)":"rgba(0,0,0,0.09)"}/>
        <button onClick={send} disabled={!input.trim()||loading} style={{
          background:input.trim()&&!loading?"linear-gradient(135deg,#00D4C8,#7C3AED)":dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",
          border:"none",borderRadius:13,padding:"0 22px",
          fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,
          color:input.trim()&&!loading?"#fff":dark?"#444":"#ccc",
          cursor:input.trim()&&!loading?"pointer":"not-allowed",transition:"all .2s",whiteSpace:"nowrap"}}>{loading?"...":"Ask →"}</button>
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
const FORMSPREE_ID="xqalldrb";

function ContactPage({dark}){
  const [form,setForm]=useState({name:"",email:"",subject:"",message:""});
  const [status,setStatus]=useState("idle");
  const [touched,setTouched]=useState({});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const touch=(k)=>setTouched(t=>({...t,[k]:true}));
  const valid={name:form.name.trim().length>=2,email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),message:form.message.trim().length>=10};
  const canSubmit=valid.name&&valid.email&&valid.message&&status!=="sending";

  const submit=async()=>{
    if(!canSubmit){setTouched({name:true,email:true,message:true});return;}
    setStatus("sending");
    try{
      const res=await fetch(`https://formspree.io/f/${FORMSPREE_ID}`,{
        method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({...form,_subject:`✨ Discover AI with Abe — ${form.subject||"New message"} from ${form.name}`}),
      });
      setStatus(res.ok?"success":"error");
      if(res.ok){setForm({name:"",email:"",subject:"",message:""});setTouched({});}
    }catch{setStatus("error");}
  };

  const inp=(field,extra={})=>({
    width:"100%",padding:"13px 16px",display:"block",
    background:dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.9)",
    border:`1.5px solid ${touched[field]&&!valid[field]?"#F43F5E":dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.09)"}`,
    borderRadius:12,outline:"none",fontSize:14,
    color:dark?"#f0f0f8":"#080810",fontFamily:"'Inter',sans-serif",
    transition:"border-color .2s",...extra,
  });

  return(
    <div style={{minHeight:"100vh",padding:"80px 16px 100px",maxWidth:680,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <div style={{width:72,height:72,borderRadius:20,margin:"0 auto 16px",
          background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
          display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,
          boxShadow:"0 12px 40px rgba(0,212,200,0.3)"}}>📬</div>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,
          fontSize:"clamp(28px,5vw,46px)",color:dark?"#f0f0f8":"#080810",margin:"0 0 12px",letterSpacing:"-.02em"}}>
          Get in <span style={{background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Touch</span>
        </h1>
        <p style={{fontFamily:"'Inter',sans-serif",fontSize:16,
          color:dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",lineHeight:1.65,maxWidth:440,margin:"0 auto"}}>
          Tool suggestion, feedback, or just want to say hi? Abe reads every message.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(180px,100%),1fr))",gap:12,marginBottom:36}}>

        {/* Email card */}
        <div style={{background:dark?"rgba(12,12,20,0.85)":"rgba(255,255,255,0.85)",
          border:"1px solid rgba(0,212,200,0.2)",
          borderRadius:16,padding:"20px 18px",backdropFilter:"blur(16px)",textAlign:"center",
          boxShadow:"0 4px 20px rgba(0,212,200,0.08)"}}>
          <div style={{width:44,height:44,borderRadius:12,margin:"0 auto 12px",
            background:"linear-gradient(135deg,#00D4C8,#7C3AED)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📬</div>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
            color:dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",letterSpacing:".08em",marginBottom:6}}>EMAIL US</p>
          <a href="https://formspree.io/f/xqalldrb" style={{
            fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:13,
            color:"#00D4C8",textDecoration:"none",display:"block",marginBottom:4}}>
            Send a message →
          </a>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,
            color:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.35)"}}>Reply within 24hrs</p>
        </div>

        {/* WhatsApp 1 */}
        <div style={{background:dark?"rgba(12,12,20,0.85)":"rgba(255,255,255,0.85)",
          border:"1px solid rgba(37,211,102,0.25)",
          borderRadius:16,padding:"20px 18px",backdropFilter:"blur(16px)",textAlign:"center",
          boxShadow:"0 4px 20px rgba(37,211,102,0.08)"}}>
          <div style={{width:44,height:44,borderRadius:12,margin:"0 auto 12px",
            background:"linear-gradient(135deg,#25D366,#128C7E)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>💬</div>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
            color:dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",letterSpacing:".08em",marginBottom:6}}>WHATSAPP</p>
          <a href="https://wa.me/0970050032" target="_blank" rel="noreferrer" style={{
            fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,
            color:"#25D366",textDecoration:"none",display:"block",marginBottom:4}}>
            0970 050 032
          </a>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,
            color:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.35)"}}>Available on WhatsApp</p>
        </div>

        {/* WhatsApp 2 */}
        <div style={{background:dark?"rgba(12,12,20,0.85)":"rgba(255,255,255,0.85)",
          border:"1px solid rgba(37,211,102,0.25)",
          borderRadius:16,padding:"20px 18px",backdropFilter:"blur(16px)",textAlign:"center",
          boxShadow:"0 4px 20px rgba(37,211,102,0.08)"}}>
          <div style={{width:44,height:44,borderRadius:12,margin:"0 auto 12px",
            background:"linear-gradient(135deg,#25D366,#128C7E)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>💬</div>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
            color:dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",letterSpacing:".08em",marginBottom:6}}>WHATSAPP</p>
          <a href="https://wa.me/0970050025" target="_blank" rel="noreferrer" style={{
            fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,
            color:"#25D366",textDecoration:"none",display:"block",marginBottom:4}}>
            0970 050 025
          </a>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,
            color:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.35)"}}>Available on WhatsApp</p>
        </div>

        {/* Quick reply */}
        <div style={{background:dark?"rgba(12,12,20,0.85)":"rgba(255,255,255,0.85)",
          border:`1px solid ${dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)"}`,
          borderRadius:16,padding:"20px 18px",backdropFilter:"blur(16px)",textAlign:"center"}}>
          <div style={{width:44,height:44,borderRadius:12,margin:"0 auto 12px",
            background:"linear-gradient(135deg,#F59E0B,#EF4444)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>⚡</div>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:12,
            color:dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",letterSpacing:".08em",marginBottom:6}}>SUGGESTIONS</p>
          <p style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:13,
            color:dark?"#f0f0f8":"#080810",marginBottom:4}}>Tool requests welcome</p>
          <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,
            color:dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.35)"}}>We add new tools weekly</p>
        </div>

      </div>

      <div style={{background:dark?"rgba(12,12,20,0.85)":"rgba(255,255,255,0.88)",
        border:`1px solid ${dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"}`,
        borderRadius:22,padding:"36px 30px",backdropFilter:"blur(20px)",
        boxShadow:dark?"0 12px 50px rgba(0,0,0,0.5)":"0 12px 50px rgba(0,0,0,0.07)"}}>



        {status==="success"?(
          <div style={{textAlign:"center",padding:"40px 0"}}>
            <div style={{fontSize:52,marginBottom:16}}>🎉</div>
            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:24,
              color:dark?"#f0f0f8":"#080810",marginBottom:10}}>Message sent!</h2>
            <p style={{fontFamily:"'Inter',sans-serif",fontSize:15,
              color:dark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",marginBottom:28}}>Abe will get back to you soon.</p>
            <button onClick={()=>setStatus("idle")} style={{background:"linear-gradient(135deg,#00D4C8,#7C3AED)",border:"none",
              borderRadius:100,padding:"11px 26px",color:"#fff",
              fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>Send another</button>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(220px,100%),1fr))",gap:14}}>
              <div>
                <label style={{display:"block",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
                  fontSize:11,color:dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.4)",marginBottom:7,letterSpacing:".05em"}}>NAME *</label>
                <input value={form.name} onChange={e=>set("name",e.target.value)} onBlur={()=>touch("name")}
                  placeholder="Your name" style={inp("name")}
                  onFocus={e=>e.target.style.borderColor="#00D4C8"}
                  onBlur2={e=>e.target.style.borderColor=touched.name&&!valid.name?"#F43F5E":dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.09)"}/>
                {touched.name&&!valid.name&&<p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#F43F5E",marginTop:4}}>Required</p>}
              </div>
              <div>
                <label style={{display:"block",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
                  fontSize:11,color:dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.4)",marginBottom:7,letterSpacing:".05em"}}>EMAIL *</label>
                <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} onBlur={()=>touch("email")}
                  placeholder="you@example.com" style={inp("email")}
                  onFocus={e=>e.target.style.borderColor="#00D4C8"}/>
                {touched.email&&!valid.email&&<p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#F43F5E",marginTop:4}}>Valid email needed</p>}
              </div>
            </div>
            <div>
              <label style={{display:"block",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
                fontSize:11,color:dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.4)",marginBottom:7,letterSpacing:".05em"}}>SUBJECT</label>
              <input value={form.subject} onChange={e=>set("subject",e.target.value)}
                placeholder="Tool suggestion, feedback, question..." style={inp("subject")}
                onFocus={e=>e.target.style.borderColor="#00D4C8"}
                onBlur={e=>e.target.style.borderColor=dark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.09)"}/>
            </div>
            <div>
              <label style={{display:"block",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,
                fontSize:11,color:dark?"rgba(255,255,255,0.35)":"rgba(0,0,0,0.4)",marginBottom:7,letterSpacing:".05em"}}>MESSAGE *</label>
              <textarea value={form.message} onChange={e=>set("message",e.target.value)} onBlur={()=>touch("message")}
                placeholder="Tell Abe what's on your mind..." rows={5}
                style={inp("message",{resize:"vertical",lineHeight:1.6})}
                onFocus={e=>e.target.style.borderColor="#00D4C8"}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                {touched.message&&!valid.message
                  ?<p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:"#F43F5E"}}>Min. 10 characters</p>
                  :<span/>}
                <p style={{fontFamily:"'Inter',sans-serif",fontSize:11,color:dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.25)"}}>{form.message.length}</p>
              </div>
            </div>
            {status==="error"&&<div style={{background:"rgba(244,63,94,0.08)",border:"1px solid rgba(244,63,94,0.2)",
              borderRadius:10,padding:"12px 16px"}}>
              <p style={{fontFamily:"'Inter',sans-serif",fontSize:13,color:"#F43F5E"}}>⚠️ Something went wrong. Check your Formspree ID and try again.</p>
            </div>}
            <button onClick={submit} disabled={!canSubmit} style={{
              background:canSubmit?"linear-gradient(135deg,#00D4C8,#7C3AED)":dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",
              border:"none",borderRadius:13,padding:"15px",
              fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:15,
              color:canSubmit?"#fff":dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.2)",
              cursor:canSubmit?"pointer":"not-allowed",transition:"all .25s",
              boxShadow:canSubmit?"0 8px 28px rgba(0,212,200,0.25)":"none"}}>
              {status==="sending"?"Sending...":"Send Message →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FLOATING BUTTON ─────────────────────────────────────────────────────────
function FloatBtn({setPage}){
  const [hov,setHov]=useState(false);
  return(
    <button onClick={()=>setPage("ask")}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{position:"fixed",bottom:28,right:28,zIndex:300,
        background:"linear-gradient(135deg,#00D4C8,#7C3AED)",border:"none",borderRadius:100,
        padding:"14px 20px",display:"flex",alignItems:"center",gap:10,
        boxShadow:"0 8px 32px rgba(0,212,200,0.4)",cursor:"pointer",
        transform:hov?"scale(1.07)":"scale(1)",transition:"all .3s cubic-bezier(.4,0,.2,1)"}}>
      <span style={{fontSize:20}}>✨</span>
      <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:13,color:"#fff",
        maxWidth:hov?110:0,overflow:"hidden",whiteSpace:"nowrap",transition:"max-width .3s ease"}}>Ask Abe</span>
    </button>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [dark,setDark]=useState(true);
  const [page,setPage]=useState("home");
  const [picks,setPicks]=useState(loadPicks);
  return(
    <>
      <style>{G(dark)}</style>
      <div style={{background:dark?"#030308":"#F0F4F8",minHeight:"100vh",
        color:dark?"#f0f0f8":"#080810",transition:"background .3s,color .3s"}}>
        <Navbar page={page} setPage={setPage} dark={dark} setDark={setDark} picksCount={Object.keys(picks).length}/>
        {page==="home"    &&<HomePage dark={dark} setPage={setPage} picks={picks} setPicks={setPicks}/>}
        {page==="picks"   &&<MyPicksPage dark={dark} picks={picks} setPicks={setPicks} setPage={setPage}/>}
        {page==="ask"     &&<AskAbePage dark={dark}/>}
        {page==="contact" &&<ContactPage dark={dark}/>}
        {page!=="ask"     &&<FloatBtn setPage={setPage}/>}
      </div>
    </>
  );
}
