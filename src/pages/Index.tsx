import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ActivityCard } from "@/components/ActivityCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ProgressBar } from "@/components/ProgressBar";
import { FullScreenSky } from "@/components/FullScreenSky";
import { MoneySlider } from "@/components/MoneySlider";
import { StoryNamingScreen } from "@/components/StoryNamingScreen";
import { HistoryTab } from "@/components/HistoryTab";
import { addHistory } from "@/lib/historyStore";

type View = "intro" | "choose" | "history" | "sky" | "sell" | "name";

const Index = () => {
  const [view, setView] = useState<View>("intro");
  const [step, setStep] = useState(1);
  const [thought, setThought] = useState("");
  const [reflection, setReflection] = useState("");
  const [sellValue, setSellValue] = useState(50);
  const [storyName, setStoryName] = useState("");

  const reset = () => {
    setStep(1);
    setThought("");
    setReflection("");
    setSellValue(50);
    setStoryName("");
  };

  const finishExercise = (technique: string) => {
    addHistory({ technique, thought, reflection });
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
                <p className="text-base text-muted-foreground text-justify mb-2">Imagine your mind as a wide open sky.</p>
                <p className="text-base text-muted-foreground text-justify mb-2">Thoughts are like clouds passing through.</p>
                <p className="text-base text-muted-foreground text-justify mb-2">Some are light and fluffy. Some are dark and stormy.</p>
                <p className="text-base text-muted-foreground text-justify mb-2">But clouds always move on.</p>
                <p className="text-base text-muted-foreground text-justify mb-6">Your job is simply to watch them pass.</p>
                <PrimaryButton onClick={() => setStep(2)}>Begin Exercise</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 2 && (
            <ScreenWrapper key="sky2">
              <ProgressBar current={2} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">What thought is on your mind right now?</h2>
                <p className="text-base text-muted-foreground text-justify mb-4">Write one thought that has been bothering you recently.</p>
                <input
                  type="text"
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder='Example: "I might fail this presentation"'
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(3)} disabled={!thought.trim()}>Place it on a Cloud →</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 3 && (
            <FullScreenSky key="sky3" thought={thought} onNext={() => setStep(4)} />
          )}
          {step === 4 && (
            <ScreenWrapper key="sky4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">What did you notice?</h2>
                <p className="text-base text-muted-foreground text-justify mb-4">How did it feel watching the thought instead of holding onto it?</p>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Optional reflection..."
                  rows={3}
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6 resize-none"
                />
                <PrimaryButton onClick={() => { finishExercise("Sky and Cloud"); setStep(5); }}>Finish Exercise</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="sky5">
              <SkyConclusion onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // SELL THE THOUGHT EXERCISE
  if (view === "sell") {
    const totalSteps = 5;
    return (
      <div className="min-h-screen py-8" style={{ background: "linear-gradient(180deg, #EEF2FF, #E6F4FF)" }}>
        {renderNav()}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <ScreenWrapper key="sell1">
              <ProgressBar current={1} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">💰</span></div>
                <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">Sell the Thought</h1>
                <p className="text-base text-muted-foreground text-justify mb-2">Sometimes our mind tries to sell us thoughts that feel very convincing.</p>
                <p className="text-base text-muted-foreground text-justify mb-2">In this exercise you will treat your thought like a product someone is trying to sell you.</p>
                <p className="text-base text-muted-foreground text-justify mb-6">Let's see how valuable it really is.</p>
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
                  placeholder="I'm not good enough"
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
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">How much would this thought cost?</h2>
                <p className="text-base text-muted-foreground text-justify mb-6">If someone tried to sell you this thought, how valuable would it actually be?</p>
                <MoneySlider value={sellValue} onChange={setSellValue} />
                <div className="mt-6">
                  <PrimaryButton onClick={() => setStep(4)}>Next →</PrimaryButton>
                </div>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 4 && (
            <ScreenWrapper key="sell4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <div className="text-center mb-4"><span className="text-5xl">{sellValue < 30 ? "🎯" : sellValue < 70 ? "🤔" : "💭"}</span></div>
                {sellValue < 30 ? (
                  <>
                    <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Not a great deal</h2>
                    <p className="text-base text-muted-foreground text-justify mb-2">Looks like this thought may not be very valuable.</p>
                    <p className="text-base text-muted-foreground text-justify mb-6">Sometimes our mind tries to sell us things we don't need to buy.</p>
                  </>
                ) : sellValue < 70 ? (
                  <>
                    <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Worth considering</h2>
                    <p className="text-base text-muted-foreground text-justify mb-2">This thought has some pull, but it's not the whole story.</p>
                    <p className="text-base text-muted-foreground text-justify mb-6">Noticing it is the first step toward gaining perspective.</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-[22px] font-medium text-foreground text-center mb-4">A convincing thought</h2>
                    <p className="text-base text-muted-foreground text-justify mb-2">This thought feels convincing right now.</p>
                    <p className="text-base text-muted-foreground text-justify mb-6">Noticing it is the first step toward gaining distance from it.</p>
                  </>
                )}
                <PrimaryButton onClick={() => { finishExercise("Sell the Thought"); setStep(5); }}>Finish Exercise</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="sell5">
              <SellConclusion onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
            </ScreenWrapper>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // NAME THE STORY EXERCISE
  if (view === "name") {
    const totalSteps = 5;
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
                <p className="text-base text-muted-foreground text-justify mb-2">Our mind often repeats the same thoughts again and again.</p>
                <p className="text-base text-muted-foreground text-justify mb-2">Instead of fighting them, we can simply name the story our mind is telling.</p>
                <p className="text-base text-muted-foreground text-justify mb-6">This helps us notice the thought instead of getting caught in it.</p>
                <PrimaryButton onClick={() => setStep(2)}>Begin Exercise</PrimaryButton>
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
                  placeholder='"I always mess things up"'
                  className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
                />
                <PrimaryButton onClick={() => setStep(3)} disabled={!thought.trim()}>Continue</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 3 && (
            <StoryNamingScreen
              key="name3"
              storyName={storyName}
              onStoryNameChange={setStoryName}
              onContinue={() => setStep(4)}
              currentStep={3}
              totalSteps={totalSteps}
            />
          )}
          {step === 4 && (
            <ScreenWrapper key="name4">
              <ProgressBar current={4} total={totalSteps} />
              <ActivityCard>
                <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Notice the story</h2>
                <p className="text-base text-muted-foreground text-justify mb-2">Next time this thought appears, try saying:</p>
                <p className="text-base font-medium text-foreground text-center my-4 italic">"I'm noticing my mind telling the {storyName} again."</p>
                <p className="text-base text-muted-foreground text-justify mb-6">This small shift helps you step back from the thought.</p>
                <PrimaryButton onClick={() => { finishExercise("Name the Story"); setStep(5); }}>Finish Exercise</PrimaryButton>
              </ActivityCard>
            </ScreenWrapper>
          )}
          {step === 5 && (
            <ScreenWrapper key="name5">
              <NameConclusion storyName={storyName} onTryAnother={() => { reset(); setView("choose"); }} onHome={() => { reset(); setView("intro"); }} />
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
              <p className="text-base text-muted-foreground text-justify mb-2">Sometimes our thoughts feel overwhelming because we treat them as facts.</p>
              <p className="text-base text-muted-foreground text-justify mb-2">Diffusion techniques help you step back and observe thoughts instead of getting stuck in them.</p>
              <p className="text-base text-muted-foreground text-justify mb-6">In this activity you will try simple exercises that help your mind create space from unhelpful thoughts.</p>
              <PrimaryButton onClick={() => setView("choose")}>Start Activity</PrimaryButton>
            </ActivityCard>
          </ScreenWrapper>
        )}
        {view === "choose" && step !== 7 && (
          <ScreenWrapper key="choose">
            <h1 className="text-[32px] font-semibold text-foreground text-center mb-2">Choose a Technique to Practice</h1>
            <p className="text-base text-muted-foreground text-center text-justify mb-6">Each exercise helps you look at your thoughts from a new perspective. Pick one and follow the guided steps.</p>
            <div className="space-y-4">
              {[
                { icon: "☁️", title: "Sky and Cloud", desc: "Imagine your thoughts drifting across the sky like clouds. Watch them appear and pass by without holding onto them.", view: "sky" as View },
                { icon: "💰", title: "Sell the Thought", desc: "Treat your thought like something being sold to you. How valuable is it really?", view: "sell" as View },
                { icon: "📖", title: "Name the Story", desc: "When thoughts repeat again and again, they become stories. Naming the story helps create distance from it.", view: "name" as View },
              ].map((card) => (
                <ActivityCard key={card.title}>
                  <div className="text-center mb-2"><span className="text-4xl">{card.icon}</span></div>
                  <h3 className="text-[22px] font-medium text-foreground text-center mb-2">{card.title}</h3>
                  <p className="text-base text-muted-foreground text-justify mb-4">{card.desc}</p>
                  <PrimaryButton onClick={() => { reset(); setView(card.view); }}>Start Exercise →</PrimaryButton>
                </ActivityCard>
              ))}
            </div>
          </ScreenWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

function SkyConclusion({ onTryAnother, onHome }: { onTryAnother: () => void; onHome: () => void }) {
  return (
    <ActivityCard>
      <div className="text-center mb-4"><span className="text-5xl">☁️✨</span></div>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">The Thought Drifted Away</h1>
      <p className="text-base text-muted-foreground text-justify mb-2">Thoughts are like clouds in the sky.</p>
      <p className="text-base text-muted-foreground text-justify mb-2">They appear, move across our mind, and eventually pass.</p>
      <p className="text-base text-muted-foreground text-justify mb-2">You practiced watching the thought instead of holding onto it.</p>
      <p className="text-base text-muted-foreground text-justify mb-6">The more you practice this, the easier it becomes to let thoughts come and go.</p>
      <div className="space-y-3">
        <PrimaryButton onClick={onTryAnother}>Try Another Technique</PrimaryButton>
        <PrimaryButton variant="outline" onClick={onHome}>Back to Techniques</PrimaryButton>
      </div>
    </ActivityCard>
  );
}

function SellConclusion({ onTryAnother, onHome }: { onTryAnother: () => void; onHome: () => void }) {
  return (
    <ActivityCard>
      <div className="text-center mb-4"><span className="text-5xl">💰✨</span></div>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">You Questioned the Thought</h1>
      <p className="text-base text-muted-foreground text-justify mb-2">Not every thought that appears in our mind deserves our attention.</p>
      <p className="text-base text-muted-foreground text-justify mb-2">By evaluating its value, you practiced stepping back and questioning the thought instead of automatically believing it.</p>
      <p className="text-base text-muted-foreground text-justify mb-6">Sometimes thoughts sound convincing — but they aren't always worth buying.</p>
      <div className="space-y-3">
        <PrimaryButton onClick={onTryAnother}>Try Another Technique</PrimaryButton>
        <PrimaryButton variant="outline" onClick={onHome}>Back to Techniques</PrimaryButton>
      </div>
    </ActivityCard>
  );
}

function NameConclusion({ storyName, onTryAnother, onHome }: { storyName: string; onTryAnother: () => void; onHome: () => void }) {
  return (
    <ActivityCard>
      <div className="text-center mb-4"><span className="text-5xl">📖✨</span></div>
      <h1 className="text-[32px] font-semibold text-foreground text-center mb-4">You Named the Story</h1>
      <p className="text-base text-muted-foreground text-justify mb-2">Our minds often repeat the same stories again and again.</p>
      <p className="text-base text-muted-foreground text-justify mb-2">By giving the thought a name, you practiced recognizing the story instead of getting caught in it.</p>
      <p className="text-base text-muted-foreground text-justify mb-2">Next time it appears, you can simply notice:</p>
      <p className="text-base font-medium text-foreground text-center my-4 italic">"There goes the {storyName} again."</p>
      <div className="space-y-3">
        <PrimaryButton onClick={onTryAnother}>Try Another Technique</PrimaryButton>
        <PrimaryButton variant="outline" onClick={onHome}>Back to Techniques</PrimaryButton>
      </div>
    </ActivityCard>
  );
}

export default Index;
