import { Seo } from "@/components/seo";
import { DocPageHeader } from "@/components/docs/doc-page-header";
import { DocSectionHeader } from "@/components/docs/doc-section-header";
import { DocNextSteps } from "@/components/docs/doc-next-steps";
import { DocApiTable } from "@/components/docs/doc-api-table";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* --- Code Snippets --- */
const importCode = `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";`;

const defaultCode = `<Dialog>
  <DialogTrigger as={Button} variant="outline">
    Edit Profile
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you are done.
      </DialogDescription>
    </DialogHeader>
    <div class="space-y-4 py-2">
      <div class="space-y-2">
        <Label for="name">Name</Label>
        <Input id="name" value="Niko Pirosmani" />
      </div>
      <div class="space-y-2">
        <Label for="username">Username</Label>
        <Input id="username" value="@pirosmani" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose as={Button} variant="outline">Cancel</DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const customOutsideClickCode = `<Dialog>
  <DialogTrigger as={Button} variant="destructive">
    Delete Repository
  </DialogTrigger>
  <DialogContent closeOnOutsideClick={false}>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Clicking outside this window will not dismiss it.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter class="gap-2">
      <DialogClose as={Button} variant="outline">
        Cancel
      </DialogClose>
      <DialogClose as={Button} variant="destructive">
        Confirm Delete
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const noBlurCode = `<Dialog>
  <DialogTrigger as={Button} variant="secondary">
    No Backdrop Blur
  </DialogTrigger>
  <DialogContent blur={false}>
    <DialogHeader>
      <DialogTitle>Clear Overlay</DialogTitle>
      <DialogDescription>
        This dialog disables the background backdrop blur effect.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose as={Button}>Close</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const noCloseButtonCode = `<Dialog>
  <DialogTrigger as={Button} variant="outline">
    Custom Footer Close Only
  </DialogTrigger>
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Terms of Service</DialogTitle>
      <DialogDescription>
        Please review the policy agreement before continuing.
      </DialogDescription>
    </DialogHeader>
    <div class="py-2 text-sm text-muted-foreground leading-relaxed">
      By clicking Accept, you agree to our terms and conditions.
    </div>
    <DialogFooter>
      <DialogClose as={Button} variant="outline">Decline</DialogClose>
      <DialogClose as={Button}>Accept</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

export default function DialogDocsPage() {
    return (
        <>
            <Seo
                title="Dialog Component"
                description="Accessible modal window overlaying the main content built on Kobalte primitives with backdrop blur and outside-click controls."
                path="/docs/components/dialog"
            />

            <div class="space-y-10 pb-16">
                {/* Page Header */}
                <DocPageHeader
                    title="Dialog"
                    badge="Kobalte"
                    description="A window overlaying the primary view, preventing interaction with the rest of the application until dismissed."
                />

                {/* Hero Live Preview */}
                <ComponentPreview name="dialog" code={defaultCode}>
                    <Dialog>
                        <DialogTrigger as={Button} variant="outline">
                            Edit Profile
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you are done.
                                </DialogDescription>
                            </DialogHeader>
                            <div class="space-y-4 py-2">
                                <div class="space-y-2">
                                    <Label for="hero-dialog-name">Name</Label>
                                    <Input id="hero-dialog-name" value="Niko Pirosmani" />
                                </div>
                                <div class="space-y-2">
                                    <Label for="hero-dialog-user">Username</Label>
                                    <Input id="hero-dialog-user" value="@pirosmani" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose as={Button} variant="outline">Cancel</DialogClose>
                                <Button>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </ComponentPreview>

                {/* Usage & Import */}
                <div class="space-y-4">
                    <DocSectionHeader title="Usage" />
                    <CodeBlock code={importCode} lang="tsx" />
                </div>

                {/* Examples */}
                <div class="space-y-8 pt-4">
                    <DocSectionHeader title="Examples" />

                    {/* Prevent Outside Click Close */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Prevent Outside Click Dismiss</h3>
                        <p class="text-sm text-muted-foreground">
                            Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">closeOnOutsideClick={`{false}`}</code> to force explicit user button action.
                        </p>
                        <ComponentPreview name="dialog" code={customOutsideClickCode}>
                            <Dialog>
                                <DialogTrigger as={Button} variant="destructive">
                                    Delete Repository
                                </DialogTrigger>
                                <DialogContent closeOnOutsideClick={false}>
                                    <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. Clicking outside this window will not dismiss it.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter class="gap-2">
                                        <DialogClose as={Button} variant="outline">
                                            Cancel
                                        </DialogClose>
                                        <DialogClose as={Button} variant="destructive">
                                            Confirm Delete
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </ComponentPreview>
                    </div>

                    {/* Without Backdrop Blur */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Without Backdrop Blur</h3>
                        <p class="text-sm text-muted-foreground">
                            Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">blur={`{false}`}</code> to disable the backdrop blur overlay effect.
                        </p>
                        <ComponentPreview name="dialog" code={noBlurCode}>
                            <Dialog>
                                <DialogTrigger as={Button} variant="secondary">
                                    No Backdrop Blur
                                </DialogTrigger>
                                <DialogContent blur={false}>
                                    <DialogHeader>
                                        <DialogTitle>Clear Overlay</DialogTitle>
                                        <DialogDescription>
                                            This dialog disables the background backdrop blur effect.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose as={Button}>Close</DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </ComponentPreview>
                    </div>

                    {/* Hide Close X Button */}
                    <div class="space-y-3">
                        <h3 class="text-lg font-semibold tracking-tight">Hide Top-Right Close Button</h3>
                        <p class="text-sm text-muted-foreground">
                            Pass <code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">showCloseButton={`{false}`}</code> to hide the default top-right X icon.
                        </p>
                        <ComponentPreview name="dialog" code={noCloseButtonCode}>
                            <Dialog>
                                <DialogTrigger as={Button} variant="outline">
                                    Custom Footer Close Only
                                </DialogTrigger>
                                <DialogContent showCloseButton={false}>
                                    <DialogHeader>
                                        <DialogTitle>Terms of Service</DialogTitle>
                                        <DialogDescription>
                                            Please review the policy agreement before continuing.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div class="py-2 text-sm text-muted-foreground leading-relaxed">
                                        By clicking Accept, you agree to our terms and conditions.
                                    </div>
                                    <DialogFooter>
                                        <DialogClose as={Button} variant="outline">Decline</DialogClose>
                                        <DialogClose as={Button}>Accept</DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </ComponentPreview>
                    </div>
                </div>

                {/* API Reference */}
                <div class="space-y-6 pt-6">
                    <DocSectionHeader title="API Reference" />

                    <DocApiTable
                        title="DialogContent"
                        items={[
                            {
                                prop: "showCloseButton",
                                type: "boolean",
                                default: "true",
                                description: "Shows or hides the default top-right X close icon.",
                            },
                            {
                                prop: "closeOnOutsideClick",
                                type: "boolean",
                                default: "true",
                                description: "Determines if clicking the backdrop overlay closes the dialog.",
                            },
                            {
                                prop: "blur",
                                type: "boolean",
                                default: "true",
                                description: "Toggles background backdrop blur styling on the overlay.",
                            },
                        ]}
                    />
                </div>

                {/* Footer Navigation */}
                <DocNextSteps
                    prev={{ title: "Command palette", href: "/docs/components/command" }}
                    next={{ title: "Dropdown Menu", href: "/docs/components/dropdown-menu" }}
                />
            </div>
        </>
    );
}