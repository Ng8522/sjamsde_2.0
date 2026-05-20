import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Upload, Users } from "lucide-react";

import { MockSuccess, SiteLayout } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  RAKAN_ST_JOHN_ABOUT,
  RAKAN_ST_JOHN_LOGO_URL,
  RAKAN_ST_JOHN_PROGRAMME,
  RAKAN_ST_JOHN_REGISTER_NOTE,
  RAKAN_ST_JOHN_TAGLINE,
} from "@/lib/rakan-st-john";

export const Route = createFileRoute("/volunteer")({
  component: RakanStJohnPage,
  head: () => ({
    meta: [
      { title: "Rakan St John — SJAM Selangor" },
      {
        name: "description",
        content:
          "Empowering the community with basic First Aid skills and charity volunteering through Rakan St. John.",
      },
    ],
  }),
});

const shirtSizes = ["S", "M", "L", "XL", "XXL"] as const;
const acceptedFileTypes = ".jpg,.jpeg,.pdf,.png";

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
      {children} <span className="text-destructive">*</span>
    </Label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-primary font-semibold text-base border-b-2 border-primary pb-1 mb-6">{children}</h2>
  );
}

function FileField({
  id,
  label,
  required = true,
}: {
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <div className="flex items-center gap-3">
        <label
          htmlFor={id}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
        >
          <Upload className="size-4" />
          Choose a file
        </label>
        <Input
          id={id}
          name={id}
          type="file"
          accept={acceptedFileTypes}
          required={required}
          className="sr-only"
          onChange={(e) => {
            const name = e.target.files?.[0]?.name;
            const hint = document.getElementById(`${id}-hint`);
            if (hint) hint.textContent = name ?? "No file chosen";
          }}
        />
        <span id={`${id}-hint`} className="text-sm text-muted-foreground truncate">
          No file chosen
        </span>
      </div>
    </div>
  );
}

function RakanStJohnPage() {
  const [submitted, setSubmitted] = useState(false);
  const [shirtSize, setShirtSize] = useState<string>("M");

  if (submitted) {
    return (
      <SiteLayout>
        <section className="max-w-7xl mx-auto px-6 py-16">
          <MockSuccess
            title="Registration received"
            description="Thank you for registering with Rakan St. John. Our team will review your submission and contact you regarding upcoming classes and activities."
          >
            <Button asChild variant="outline">
              <Link to="/">Back to home</Link>
            </Button>
          </MockSuccess>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-14">
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            <img
              src={RAKAN_ST_JOHN_LOGO_URL}
              alt="Rakan St John logo"
              width={200}
              height={200}
              className="w-40 md:w-48 h-auto object-contain shrink-0 mx-auto md:mx-0"
            />
            <div className="flex-1 text-center md:text-left">
              <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2">
                <Users className="size-3.5" />
                Community programme
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Rakan St John</h1>
              <p className="text-lg text-muted-foreground mt-3 max-w-2xl font-medium md:max-w-none">{RAKAN_ST_JOHN_TAGLINE}</p>
              <div className="mt-5 max-w-3xl space-y-3 text-muted-foreground leading-relaxed md:max-w-none">
                <p>{RAKAN_ST_JOHN_ABOUT}</p>
                <p>{RAKAN_ST_JOHN_PROGRAMME}</p>
                <p className="text-foreground/80 font-medium">{RAKAN_ST_JOHN_REGISTER_NOTE}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <h2 className="text-center text-xl md:text-2xl font-bold tracking-wide uppercase underline underline-offset-8 decoration-2 mb-10">
          Registration Form
        </h2>

        <form
          className="grid lg:grid-cols-2 gap-10 lg:gap-14"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="space-y-6">
            <SectionTitle>Personal Details</SectionTitle>

            <div className="space-y-4">
              <div>
                <RequiredLabel htmlFor="pd-name">Name</RequiredLabel>
                <Input
                  id="pd-name"
                  name="name"
                  required
                  placeholder="Your Name according to IC..."
                  className="mt-1.5"
                />
              </div>
              <div>
                <RequiredLabel htmlFor="pd-ic">I.C. No</RequiredLabel>
                <Input id="pd-ic" name="icNo" required placeholder="e.g. 010203-04-0506" className="mt-1.5" />
              </div>
              <div>
                <RequiredLabel htmlFor="pd-contact">Contact No</RequiredLabel>
                <Input id="pd-contact" name="contactNo" required placeholder="e.g. 012345678" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pd-email" className="text-sm font-medium">
                  Email
                </Label>
                <Input id="pd-email" name="email" type="email" placeholder="e.g. example@gmail.com" className="mt-1.5" />
              </div>
              <div>
                <RequiredLabel htmlFor="pd-address">Address</RequiredLabel>
                <Textarea
                  id="pd-address"
                  name="address"
                  required
                  rows={3}
                  placeholder="Your Address..."
                  className="mt-1.5 resize-y"
                />
              </div>
              <div>
                <Label htmlFor="pd-occupation" className="text-sm font-medium">
                  Occupation
                </Label>
                <Input id="pd-occupation" name="occupation" placeholder="Your occupation..." className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="pd-skill" className="text-sm font-medium">
                  Specialty/ Skill
                </Label>
                <Input id="pd-skill" name="skill" placeholder="Your Skill" className="mt-1.5" />
              </div>
              <div>
                <Label className="text-sm font-medium">T-shirt Size</Label>
                <RadioGroup
                  value={shirtSize}
                  onValueChange={setShirtSize}
                  name="shirtSize"
                  className="mt-2 flex flex-wrap gap-4"
                >
                  {shirtSizes.map((size) => (
                    <div key={size} className="flex items-center gap-2">
                      <RadioGroupItem value={size} id={`shirt-${size}`} />
                      <Label htmlFor={`shirt-${size}`} className="font-normal cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="pd-medical" className="text-sm font-medium">
                  Medical History
                </Label>
                <Input
                  id="pd-medical"
                  name="medicalHistory"
                  placeholder="e.g. Asthma, Diabetes, Hypertension"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="pd-allergy" className="text-sm font-medium">
                  Allergy
                </Label>
                <Input id="pd-allergy" name="allergy" placeholder="e.g. Peanuts, Penicillin, Seafood" className="mt-1.5" />
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <SectionTitle>Emergency Contact</SectionTitle>
              <div className="space-y-4">
                <div>
                  <RequiredLabel htmlFor="ec-name">Name</RequiredLabel>
                  <Input
                    id="ec-name"
                    name="emergencyName"
                    required
                    placeholder="The person name who can be reach out"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <RequiredLabel htmlFor="ec-relationship">Relationship</RequiredLabel>
                  <Input
                    id="ec-relationship"
                    name="emergencyRelationship"
                    required
                    placeholder="e.g. Father, Mother, Spouse..."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <RequiredLabel htmlFor="ec-contact">Contact No</RequiredLabel>
                  <Input
                    id="ec-contact"
                    name="emergencyContactNo"
                    required
                    placeholder="e.g. 012345678"
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>

            <div>
              <SectionTitle>Documentation for Insurance Verification Purpose</SectionTitle>
              <p className="text-sm text-muted-foreground mb-5">
                File format: Only <span className="font-medium">.jpg</span>, <span className="font-medium">.jpeg</span>,{" "}
                <span className="font-medium">.pdf</span> and <span className="font-medium">.png</span>
              </p>
              <div className="space-y-5">
                <FileField id="doc-passport" label="Passport Photo" />
                <FileField id="doc-ic" label="Copy of Identification Card" />
                <FileField id="doc-cert" label="Copy of Professional Qualification Certificate" required={false} />
                <FileField id="doc-payment" label="Proof of Payment" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-center pt-4">
            <Button type="submit" size="lg" className="min-w-[200px] px-10">
              Submit Registration
            </Button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}
