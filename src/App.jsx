import React, { useCallback, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { stories, CLOSE_SLUG } from "./data/stories";
import Landing from "./v2/Landing";
import StoryPlayer from "./v2/StoryPlayer";
import Close from "./v2/Close";

/*
 * Routes
 *   /                     landing
 *   /project-executive    story 1   (/superintendent, /data-team, /security)
 *   /next-step            close
 *
 * Query flags (handy for recording the marketing video)
 *   ?autoplay=1   play every story back-to-back, then the close
 *   ?clean=1      hide player controls (captions stay)
 */

const params = new URLSearchParams(window.location.search);
const AUTOPLAY = params.has("autoplay");
const CLEAN = params.has("clean");

function routeFromPath(pathname) {
  const slug = pathname.replace(/^\/|\/$/g, "").toLowerCase();
  if (slug === CLOSE_SLUG) return { view: "close" };
  const idx = stories.findIndex((s) => s.slug === slug || s.id === slug);
  if (idx >= 0) return { view: "story", idx };
  return { view: "home" };
}

function push(path) {
  const qs = window.location.search;
  if (window.location.pathname !== path) window.history.pushState({}, "", path + qs);
}

export default function App() {
  const [route, setRoute] = useState(() => routeFromPath(window.location.pathname));
  const [playing, setPlaying] = useState(AUTOPLAY);

  useEffect(() => {
    const onPop = () => setRoute(routeFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openStory = useCallback((idx) => {
    push(`/${stories[idx].slug}`);
    setRoute({ view: "story", idx });
  }, []);

  const goHome = useCallback(() => {
    push("/");
    setPlaying(false);
    setRoute({ view: "home" });
  }, []);

  const goClose = useCallback(() => {
    push(`/${CLOSE_SLUG}`);
    setPlaying(false);
    setRoute({ view: "close" });
  }, []);

  const playAll = useCallback(() => {
    setPlaying(true);
    openStory(0);
  }, [openStory]);

  // Autoplay from the landing page after a short beat
  useEffect(() => {
    if (AUTOPLAY && route.view === "home") {
      const t = setTimeout(() => openStory(0), 4500);
      return () => clearTimeout(t);
    }
  }, [route.view, openStory]);

  const finishStory = useCallback(() => {
    if (route.view !== "story") return;
    if (route.idx < stories.length - 1) openStory(route.idx + 1);
    else goClose();
  }, [route, openStory, goClose]);

  let body;
  if (route.view === "story") {
    body = (
      <StoryPlayer
        key={route.idx}
        storyIdx={route.idx}
        playing={playing}
        setPlaying={setPlaying}
        onHome={goHome}
        onOpen={openStory}
        onFinishStory={finishStory}
        clean={CLEAN}
      />
    );
  } else if (route.view === "close") {
    body = <Close onOpen={openStory} onHome={goHome} />;
  } else {
    body = <Landing onOpen={openStory} />;
  }

  return (
    <>
      {body}
      <Analytics />
    </>
  );
}
