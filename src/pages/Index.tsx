import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ActivityCard } from "@/components/ActivityCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProgressBar } from "@/components/ProgressBar";
import { CloudAnimation } from "@/components/CloudAnimation";
import { HistoryTab } from "@/components/HistoryTab";
import { addHistory } from "@/lib/historyStore";

type View = "intro" | "choose" | "history" | "sky" | "sell" | "name";

const Index = () => {
  const [view, setView] = useState<View>("intro");
  const [step, setStep] = useState(1);
  const [thought, setThought] = useState("");
  const [reflection, setReflection] = useState("");
  const [sellAnswer, setSellAnswer] = useState("");
  const [storyName, setStoryName] = useState("");

  const reset = () => {
    setStep(1);
    setThought("");
    setReflection("");
    setSellAnswer("");
    setStoryName("");
  };

  const finishExercise = (technique: string) => {
    addHistory({ technique, thought, reflection });
    reset();
    setView("choose");
    setStep(7); // completion
  };

  const renderNav = () => (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => { reset(); setView("intro"); }}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view !== "history" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        Activity
      </button>
      <button
        onClick={() => setView("history")}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "history" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        History
      </button>
    </div>
  );

  if (view === "history") {
    return (
      <div className="min-h-screen py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
        {renderNav()}
        <HistoryTab onBack={() => { reset(); setView("intro"); }} />
      </div>
    );
  }

  // SKY AND CLOUD EXERCISE
  if (view === "sky") {
    const totalSteps = 5;
    return (
      <div className="min-h-screen py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
        {renderNav()}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <ScreenWrapper key="sky1">
              <ProgressBar current={1} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">☁️</span></div>
                <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">Sky and Cloud</h1>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Imagine your mind as a wide open sky.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Thoughts are like clouds passing through.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-2">They appear, move, and eventually fade away.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-2">You don't need to chase them or push them away.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-6">Just notice them.</p>
                <PrimaryButton onClick={() => setStep(2)}>Begin Exercise</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 2 && (
            <ScreenWrapper key="sky2">
              <ProgressBar current={2} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">What thought is on your mind right now?</h2>
                <p className="text-base text-muted-foreground text-justify-all mb-4">Write one thought that has been bothering you lately.</p>
                <input
                  type="text"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder="Example: I'm not good enough"
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(3)} disabled={!thought.trim()}>Continue →</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 3 && (
            <ScreenWrapper key="sky3">
              <ProgressBar current={3} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Now place that thought on a cloud</h2>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Imagine your thought written on a soft cloud.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Watch it slowly move across the sky.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-2">You are not the cloud. You are the sky observing it.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Take a slow breath and imagine the cloud drifting further away.</p>
                <CloudAnimation thought={thought} />
                <PrimaryButton onClick={() => setStep(4)}>Next →</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 4 && (
            <ScreenWrapper key="sky4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">What did you notice?</h2>
                <p className="text-base text-muted-foreground text-justify-all mb-4">How did it feel watching the thought instead of holding onto it?</p>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Optional reflection..."
                  rows={3}
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6 resize-none"
                />
                <PrimaryButton onClick={() => { finishExercise("Sky and Cloud"); setStep(5); }}>Finish Exercise →</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="sky5">
              <CompletionScreen onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // SELL THE THOUGHT EXERCISE
  if (view === "sell") {
    const totalSteps = 4;
    return (
      <div className="min-h-screen py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
        {renderNav()}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <ScreenWrapper key="sell1">
              <ProgressBar current={1} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">💲</span></div>
                <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">Sell the Thought</h1>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Sometimes our mind tries to sell us thoughts that are not very helpful.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-2">In this exercise you'll treat your thought like a product someone is trying to sell you.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-6">Let's see if it's actually worth buying.</p>
                <PrimaryButton onClick={() => setStep(2)}>Begin Exercise</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 2 && (
            <ScreenWrapper key="sell2">
              <ProgressBar current={2} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">What thought is bothering you?</h2>
                <input
                  type="text"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder="I'm going to fail"
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(3)} disabled={!thought.trim()}>Continue →</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 3 && (
            <ScreenWrapper key="sell3">
              <ProgressBar current={3} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Would you buy this thought?</h2>
                <p className="text-base text-muted-foreground text-justify-all mb-4">If someone tried to sell you this thought, would you believe it?</p>
                <div className="space-y-3 mb-6">
                  {["Definitely not", "Maybe", "Probably"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSellAnswer(opt)}
                      className={`w-full py-3 px-4 rounded-lg border-2 text-left text-base font-medium transition-all ${sellAnswer === opt ? "border-primary bg-primary/10 text-foreground" : "border-input text-muted-foreground hover:border-primary/50"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <PrimaryButton onClick={() => setStep(4)} disabled={!sellAnswer}>Next →</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 4 && (
            <ScreenWrapper key="sell4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">What makes this thought believable or not?</h2>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Optional reflection..."
                  rows={3}
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6 resize-none"
                />
                <PrimaryButton onClick={() => { finishExercise("Sell the Thought"); setStep(5); }}>Finish Exercise</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="sell5">
              <CompletionScreen onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // NAME THE STORY EXERCISE
  if (view === "name") {
    const totalSteps = 4;
    return (
      <div className="min-h-screen py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
        {renderNav()}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <ScreenWrapper key="name1">
              <ProgressBar current={1} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">📖</span></div>
                <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">Name the Story</h1>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Our mind often repeats the same thoughts over and over.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Instead of fighting the thought, we can simply name the story our mind is telling us.</p>
                <p className="text-base text-muted-foreground text-justify-all mb-6">This makes it easier to step back from it.</p>
                <PrimaryButton onClick={() => setStep(2)}>Begin</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 2 && (
            <ScreenWrapper key="name2">
              <ProgressBar current={2} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Write a recurring thought</h2>
                <input
                  type="text"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder="I always mess things up"
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(3)} disabled={!thought.trim()}>Continue</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 3 && (
            <ScreenWrapper key="name3">
              <ProgressBar current={3} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Give this thought a story name</h2>
                <p className="text-sm text-muted-foreground text-justify-all mb-1">Example:</p>
                <p className="text-sm text-muted-foreground text-justify-all mb-1">• The "I'm Not Good Enough" Story</p>
                <p className="text-sm text-muted-foreground text-justify-all mb-4">• The "Everything Will Go Wrong" Story</p>
                <input
                  type="text"
                  value={storyName}
                  onChange={(e) => setStoryName(e.target.value)}
                  placeholder="The '...' Story"
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(4)} disabled={!storyName.trim()}>Continue</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 4 && (
            <ScreenWrapper key="name4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Notice the story</h2>
                <p className="text-base text-muted-foreground text-justify-all mb-2">Next time this thought appears, try saying:</p>
                <p className="text-base font-medium text-foreground text-center my-4 italic">"I'm noticing my mind telling the {storyName} again."</p>
                <p className="text-base text-muted-foreground text-justify-all mb-6">This small shift helps create distance from the thought.</p>
                <PrimaryButton onClick={() => { finishExercise("Name the Story"); setStep(5); }}>Finish Exercise</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="name5">
              <CompletionScreen onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // INTRO & CHOOSE SCREENS
  return (
    <div className="min-h-screen py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
      {renderNav()}
      <AnimatePresence mode="wait">
        {view === "intro" && (
          <ScreenWrapper key="intro">
            <ActivityCard>
              <div className="text-center mb-4"><span className="text-5xl">🧠</span></div>
              <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">Diffusion Techniques</h1>
              <p className="text-base text-muted-foreground text-justify-all mb-2">Sometimes our thoughts feel overwhelming because we treat them as facts.</p>
              <p className="text-base text-muted-foreground text-justify-all mb-2">Diffusion techniques help you step back and observe your thoughts instead of getting caught in them.</p>
              <p className="text-base text-muted-foreground text-justify-all mb-2">In this activity you'll practice simple exercises to help your mind create space from unhelpful thoughts.</p>
              <p className="text-base text-muted-foreground text-justify-all mb-6">Choose a technique and try it.</p>
              <PrimaryButton onClick={() => setView("choose")}>Start</PrimaryButton>
            </ActivityCard>
          </ScreenWrapper>
        )}
        {view === "choose" && step !== 7 && (
          <ScreenWrapper key="choose">
            <h1 className="text-[32px] font-semibold text-foreground text-center mb-2">Choose a Technique to Practice</h1>
            <p className="text-base text-muted-foreground text-center text-justify-all mb-6">Each technique helps you look at your thoughts from a different perspective. Pick one and follow the guided steps.</p>
            <div className="space-y-4">
              {[
                { icon: "☁️", title: "Sky and Cloud", desc: "Imagine your thoughts as clouds drifting across the sky. Watch them come and go without holding on to them.", view: "sky" as View },
                { icon: "💲", title: "Sell the Thought", desc: "Look at your thought like a product someone is trying to sell you. Is it actually useful or just convincing?", view: "sell" as View },
                { icon: "📖", title: "Name the Story", desc: "Sometimes our mind repeats the same story again and again. Naming the story helps create distance from it.", view: "name" as View },
              ].map((card) => (
                <ActivityCard key={card.title}>
                  <div className="text-center mb-2"><span className="text-4xl">{card.icon}</span></div>
                  <h3 className="text-[22px] font-medium text-foreground text-center mb-2">{card.title}</h3>
                  <p className="text-base text-muted-foreground text-justify-all mb-4">{card.desc}</p>
                  <PrimaryButton onClick={() => { reset(); setView(card.view); }}>Start Exercise →</PrimaryButton>
                </ActivityCard>
              ))}
            </div>
          </ScreenWrapper>
        )}
        {view === "choose" && step === 7 && (
          <ScreenWrapper key="complete">
            <CompletionScreen onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
          </ScreenWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

function CompletionScreen({ onTryAnother, onHome }: { onTryAnother: () => void; onHome: () => void }) {
  return (
    <ActivityCard>
      <div className="text-center mb-4"><span className="text-5xl">✨</span></div>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">Nice Work</h1>
      <p className="text-base text-muted-foreground text-justify-all mb-2">Thoughts come and go just like clouds.</p>
      <p className="text-base text-muted-foreground text-justify-all mb-2">The more you practice observing them, the less power they have over you.</p>
      <p className="text-base text-muted-foreground text-justify-all mb-6">You just practiced diffusion.</p>
      <div className="space-y-3">
        <PrimaryButton onClick={onTryAnother}>Try Another Technique</PrimaryButton>
        <PrimaryButton variant="outline" onClick={onHome}>Back to Home</PrimaryButton>
      </div>
    </ActivityCard>
  );
}

export default Index;
