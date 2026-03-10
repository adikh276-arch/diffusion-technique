import { motion } from "framer-motion";
import { PrimaryButton } from "./PrimaryButton";
import { ProgressBar } from "./ProgressBar";

interface StoryNamingScreenProps {
  storyName: string;
  onStoryNameChange: (val: string) => void;
  onContinue: () => void;
  currentStep: number;
  totalSteps: number;
}

export function StoryNamingScreen({ storyName, onStoryNameChange, onContinue, currentStep, totalSteps }: StoryNamingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-lg mx-auto px-4"
    >
      <ProgressBar current={currentStep} total={totalSteps} />
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #F3EDFF 0%, #E9E4FF 100%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* Decorative elements */}
        <motion.span
          className="absolute text-3xl opacity-20"
          style={{ top: "8%", right: "8%" }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >📖</motion.span>
        <motion.span
          className="absolute text-2xl opacity-15"
          style={{ bottom: "12%", left: "6%" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 3, repeat: Infinity }}
        >✨</motion.span>
        <motion.span
          className="absolute text-xl opacity-15"
          style={{ top: "40%", left: "3%" }}
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >📖</motion.span>
        <motion.span
          className="absolute text-lg opacity-10"
          style={{ bottom: "30%", right: "5%" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >✨</motion.span>

        <div className="relative z-10">
          <h2 className="text-[22px] font-medium text-foreground text-center mb-4">Give this thought a story name</h2>
          <p className="text-base text-muted-foreground text-justify mb-1">What would you call this story?</p>
          <div className="mt-3 mb-4">
            <p className="text-sm text-muted-foreground text-justify">Examples:</p>
            <p className="text-sm text-muted-foreground italic">• The "Not Good Enough" Story</p>
            <p className="text-sm text-muted-foreground italic">• The "Everything Will Go Wrong" Story</p>
          </div>
          <input
            type="text"
            value={storyName}
            onChange={(e) => onStoryNameChange(e.target.value)}
            placeholder='The "Failure Story"'
            className="w-full border border-input rounded-lg px-4 py-3 text-base text-foreground bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
          />
          <PrimaryButton onClick={onContinue} disabled={!storyName.trim()}>Save Story</PrimaryButton>
        </div>
      </div>
    </motion.div>
  );
}
