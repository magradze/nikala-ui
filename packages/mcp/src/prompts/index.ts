import type { Prompt } from "@modelcontextprotocol/sdk/types.js";

export const MCP_PROMPTS: Prompt[] = [
  {
    name: "create_form_page",
    description: "Generate a fully accessible SolidJS form page using Nikala UI Form, Field, FormMessage, Input, Button, Alert, and createForm primitive",
    arguments: [
      {
        name: "form_name",
        description: "Name of the form (e.g. 'LoginForm', 'ContactForm', 'RegistrationForm')",
        required: true,
      },
    ],
  },
  {
    name: "setup_theme_provider",
    description: "Generate root layout setup with ThemeProvider, ThemeToggle, and Anti-FOUC ThemeScript for SolidStart",
    arguments: [],
  },
  {
    name: "create_audio_player",
    description: "Generate a custom media player UI using Nikala UI Progress, Button, Badge and createAudio primitive",
    arguments: [],
  },
];

export function handleGetPrompt(name: string, args: Record<string, string> | undefined) {
  if (name === "create_form_page") {
    const formName = args?.form_name || "CustomForm";
    return {
      description: `Instructions for generating ${formName} using Nikala UI`,
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Please generate a ${formName} component in SolidJS using Nikala UI:
1. Use Nikala UI components: \`Form\`, \`Field\`, \`FieldLabel\`, \`FormMessage\`, \`Input\`, \`Button\`, \`Alert\`, and \`Card\`.
2. Use the \`createForm\` reactive primitive imported from \`@/hooks/create-form\`.
3. Configure validation deliberately with \`validateOn: "blur"\` or \`validateOn: "submit"\` when change-time validation is too noisy.
4. Wire text inputs with \`form.handleChange\` and \`form.handleBlur\`; use \`setFieldValue\` for custom controls when needed.
5. Render field errors with \`<FormMessage form={form} name="fieldName" />\` and display \`form.submitError()\` for failed async submissions.
6. Disable submit actions while \`form.isSubmitting()\` is true.
7. Follow SolidJS props splitting rules (\`splitProps\`).
8. Apply Tailwind CSS v4 design tokens and limit border radius to \`rounded-lg\`.`,
          },
        },
      ],
    };
  }

  if (name === "setup_theme_provider") {
    return {
      description: "Instructions for setting up Nikala UI ThemeProvider and ThemeScript",
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Please set up Nikala UI Theme Management in SolidStart:
1. Import \`ThemeProvider\`, \`ThemeScript\`, and \`ThemeToggle\` from \`@/components/ui/theme-manager\`.
2. Place \`<ThemeScript storageKey="nikala-theme" />\` inside root \`<head>\` to eliminate theme flash during SSR.
3. Wrap root layout with \`<ThemeProvider storageKey="nikala-theme">\`.
4. Include \`<ThemeToggle />\` in the header navigation.`,
          },
        },
      ],
    };
  }

  if (name === "create_audio_player") {
    return {
      description: "Instructions for building a custom audio player using Nikala UI",
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Please generate a custom Audio Player in SolidJS:
1. Import \`createAudio\` primitive from \`@/hooks/create-audio\`.
2. Use Nikala UI \`Progress\` for playback track position.
3. Use Nikala UI \`Button\` for Play/Pause, Seek, and Mute controls.
4. Use Nikala UI \`Badge\` to show formatted current time and total duration.`,
          },
        },
      ],
    };
  }

  throw new Error(`Unknown prompt: ${name}`);
}
