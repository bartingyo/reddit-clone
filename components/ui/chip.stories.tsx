import Search from "@/components/icons/search";
import Chip, { ChipDeleteIcon, ChipSelectable } from "@/components/ui/chip";
import {
  ChipGroup,
  ChipGroupTitle,
  ChipSubGroup,
  ChipSubGroupContent
} from "@/components/ui/chip-group";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const meta = {
  title: "Design System/Chip",
  component: Chip
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const Variants = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Chip>Default</Chip>
        <Chip variant={"bordered"}>Bordered</Chip>
      </div>
    );
  }
} satisfies Story;

export const Selectable = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Chip asChild>
          <ChipSelectable>Default</ChipSelectable>
        </Chip>
        <Chip asChild variant={"bordered"}>
          <ChipSelectable>Bordered</ChipSelectable>
        </Chip>
      </div>
    );
  }
} satisfies Story;

export const SelectableWithDeleteIcon = {
  render: () => {
    return (
      <div className="flex items-center gap-2">
        <Chip asChild>
          <ChipSelectable>
            <span>Default</span>
            <ChipDeleteIcon />
          </ChipSelectable>
        </Chip>
        <Chip asChild variant={"bordered"}>
          <ChipSelectable>
            <span>Bordered</span>
            <ChipDeleteIcon />
          </ChipSelectable>
        </Chip>
      </div>
    );
  }
} satisfies Story;

export const Group = {
  render: () => {
    const [items, setItems] = useState<string[]>(["0", "9"]);

    return (
      <>
        <ChipGroup className="min-h-8 mb-6" values={items} onChange={setItems}>
          {items.map((value) => (
            <Chip variant={"bordered"} key={value} asChild>
              <ChipSelectable value={value}>
                <span>Item {value}</span>
                <ChipDeleteIcon />
              </ChipSelectable>
            </Chip>
          ))}
        </ChipGroup>

        <ChipGroup values={items} onChange={setItems}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Chip key={index} asChild>
              <ChipSelectable value={index}>
                <span>Item {index}</span>
                <ChipDeleteIcon />
              </ChipSelectable>
            </Chip>
          ))}
        </ChipGroup>
      </>
    );
  }
} satisfies Story;

export const SubGroup = {
  render: () => {
    const [items, setItems] = useState<string[]>([]);

    return (
      <>
        <ChipGroupTitle className="text-base">
          Topics {items.length}/3
        </ChipGroupTitle>

        <ChipGroup className="min-h-8 mb-6" values={items} onChange={setItems}>
          {items.map((value) => (
            <Chip variant={"bordered"} key={value} asChild>
              <ChipSelectable value={value}>
                <span>{value}</span>
                <ChipDeleteIcon />
              </ChipSelectable>
            </Chip>
          ))}
        </ChipGroup>

        <ChipGroup values={items} onChange={setItems}>
          <ChipSubGroup>
            <ChipGroupTitle>
              <Search />
              <span>🍣Anime & Cosplay</span>
            </ChipGroupTitle>

            <ChipSubGroupContent>
              {["Anime & Manga", "Cosplay"].map((value) => (
                <Chip key={value} asChild>
                  <ChipSelectable value={value}>
                    <span>{value}</span>
                    <ChipDeleteIcon />
                  </ChipSelectable>
                </Chip>
              ))}
            </ChipSubGroupContent>
          </ChipSubGroup>

          <ChipSubGroup>
            <ChipGroupTitle>
              <Search />
              <span>Art</span>
            </ChipGroupTitle>

            <ChipSubGroupContent>
              {[
                "Performing Arts",
                "Architecture",
                "Design",
                "Art",
                "Filmmaking",
                "Digital Art"
              ].map((value) => (
                <Chip key={value} asChild>
                  <ChipSelectable value={value}>
                    <span>{value}</span>
                    <ChipDeleteIcon />
                  </ChipSelectable>
                </Chip>
              ))}
            </ChipSubGroupContent>
          </ChipSubGroup>
        </ChipGroup>
      </>
    );
  }
} satisfies Story;
