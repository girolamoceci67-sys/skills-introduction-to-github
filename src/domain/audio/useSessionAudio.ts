import { useCallback, useEffect, useRef, useState } from 'react';
import { useAudioPlayer } from 'expo-audio';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MUTE_STORAGE_KEY = 'session-audio-muted-v1';
const BACKGROUND_VOLUME = 0.35;

const backgroundLoopSource = require('../../../assets/audio/bg-loop.wav');
const cueGoSource = require('../../../assets/audio/cue-go.wav');
const cueRestSource = require('../../../assets/audio/cue-rest.wav');
const cueCompleteSource = require('../../../assets/audio/cue-complete.wav');

export type SessionAudioCue = 'go' | 'rest' | 'complete';

export function useSessionAudio() {
  const [muted, setMuted] = useState(false);

  const backgroundPlayer = useAudioPlayer(backgroundLoopSource);
  const cueGoPlayer = useAudioPlayer(cueGoSource);
  const cueRestPlayer = useAudioPlayer(cueRestSource);
  const cueCompletePlayer = useAudioPlayer(cueCompleteSource);
  const cuePlayers = useRef({ go: cueGoPlayer, rest: cueRestPlayer, complete: cueCompletePlayer });
  cuePlayers.current = { go: cueGoPlayer, rest: cueRestPlayer, complete: cueCompletePlayer };

  useEffect(() => {
    backgroundPlayer.loop = true;
    backgroundPlayer.volume = BACKGROUND_VOLUME;
  }, [backgroundPlayer]);

  useEffect(() => {
    AsyncStorage.getItem(MUTE_STORAGE_KEY).then((value) => {
      if (value === '1') setMuted(true);
    });
  }, []);

  useEffect(() => {
    backgroundPlayer.muted = muted;
    cueGoPlayer.muted = muted;
    cueRestPlayer.muted = muted;
    cueCompletePlayer.muted = muted;
  }, [muted, backgroundPlayer, cueGoPlayer, cueRestPlayer, cueCompletePlayer]);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      AsyncStorage.setItem(MUTE_STORAGE_KEY, next ? '1' : '0');
      return next;
    });
  }, []);

  const startBackgroundMusic = useCallback(() => {
    backgroundPlayer.play();
  }, [backgroundPlayer]);

  const stopBackgroundMusic = useCallback(() => {
    backgroundPlayer.pause();
  }, [backgroundPlayer]);

  const playCue = useCallback((cue: SessionAudioCue) => {
    const player = cuePlayers.current[cue];
    player.seekTo(0).finally(() => player.play());
  }, []);

  return { muted, toggleMuted, startBackgroundMusic, stopBackgroundMusic, playCue };
}
