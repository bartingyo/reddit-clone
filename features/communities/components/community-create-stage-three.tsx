import Chip, { ChipDeleteIcon, ChipSelectable } from "@/components/ui/chip";
import {
  ChipGroup,
  ChipGroupTitle,
  ChipSubGroup,
  ChipSubGroupContent
} from "@/components/ui/chip-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { communityFormSchema } from "@/features/communities/schema";
import { Control } from "react-hook-form";
import z from "zod";

type Props = {
  formControl: Control<z.infer<typeof communityFormSchema>>;
  onTopicChange?: (topics: string[]) => void;
  onTopicError?: (error: Error) => void;
};

export default function CommunityCreateStageThree({
  formControl,
  onTopicChange,
  onTopicError
}: Props) {
  return (
    <FormField
      control={formControl}
      name="topics"
      render={({ field: { value: topics, onChange } }) => (
        <FormItem className="gap-1">
          <div className="flex flex-col gap-1 min-h-[84px]">
            <ChipGroupTitle className="text-base">
              Topics {topics.length}/3
            </ChipGroupTitle>

            <ChipGroup
              className=""
              values={topics}
              onChange={(values) => {
                onChange(values);
                onTopicChange?.(values);
              }}
            >
              {topics.map((value) => (
                <Chip variant={"bordered"} key={value} asChild>
                  <ChipSelectable value={value}>
                    <span>{value}</span>
                    <ChipDeleteIcon />
                  </ChipSelectable>
                </Chip>
              ))}
            </ChipGroup>

            <FormMessage />
          </div>

          <FormControl>
            <ChipGroup
              className="max-h-[250px] overflow-auto"
              values={topics}
              onChange={(values) => {
                if (values.length > 3) {
                  onTopicError?.(new Error("Only 3 topics can be added"));
                } else {
                  onChange(values);
                  onTopicChange?.(values);
                }
              }}
            >
              {TOPICS_DATA.map(({ id, emoji, title, topics }) => (
                <ChipSubGroup key={id}>
                  <ChipGroupTitle>
                    <span>{emoji}</span>
                    <span>{title}</span>
                  </ChipGroupTitle>

                  <ChipSubGroupContent>
                    {topics.map((value) => (
                      <Chip key={value} asChild>
                        <ChipSelectable value={value}>
                          <span>{value}</span>
                          <ChipDeleteIcon />
                        </ChipSelectable>
                      </Chip>
                    ))}
                  </ChipSubGroupContent>
                </ChipSubGroup>
              ))}
            </ChipGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export const TOPICS_DATA = [
  {
    id: 1,
    emoji: "🍣",
    title: "Anime & Cosplay",
    topics: ["Anime & Manga", "Cosplay"]
  },
  {
    id: 2,
    emoji: "🧑‍🎨",
    title: "Art",
    topics: [
      "Performing Arts",
      "Architecture",
      "Design",
      "Art",
      "Filmmaking",
      "Digital Art",
      "Photography"
    ]
  },
  {
    id: 3,
    emoji: "💵",
    title: "Business & Finance",
    topics: [
      "Personal Finance",
      "Crypto",
      "Economics",
      "Business News & Discussion",
      "Deals & Marketplace",
      "Startups & Entrepreneurship",
      "Real Estate",
      "Stocks & Investing"
    ]
  },
  {
    id: 4,
    emoji: "🧩",
    title: "Collectibles & Other Hobbies",
    topics: ["Model Building", "Collectibles", "Other Hobbies", "Toys"]
  },
  {
    id: 5,
    emoji: "🧑‍🏫",
    title: "Education & Career",
    topics: ["Studying & Education", "Career"]
  },
  {
    id: 6,
    emoji: "🪞",
    title: "Fashion & Beauty",
    topics: [
      "Nails",
      "Hair",
      "Makeup",
      "Fashion",
      "Accessories & Jewelry",
      "Beauty & Grooming",
      "Weddings",
      "Tattoos & Piercings",
      "Skincare",
      "Watches",
      "Streetwear & Sneakers"
    ]
  },
  {
    id: 7,
    emoji: "🍔",
    title: "Food & Drinks",
    topics: [
      "Food & Recipes",
      "Food industry & Restaurants",
      "Non-Alcoholic Beverages",
      "Baking & Desserts",
      "Alcoholic Beverages",
      "Barbecues & Grilling",
      "Vegetarian & Vegan Food"
    ]
  },
  {
    id: 8,
    emoji: "🕹️",
    title: "Games",
    topics: [
      "Other Games",
      "Gaming Consoles & Gear",
      "Esports",
      "Adventure Games",
      "Gaming News & Discussion",
      "Action Games",
      "Strategy Games",
      "Simulation Games",
      "Role-Playing Games",
      "Sports & Racing Games",
      "Tabletop Games",
      "Mobile Games"
    ]
  },
  {
    id: 9,
    emoji: "❤️‍🩹",
    title: "Health",
    topics: [
      "Addiction Support",
      "Pregnancy",
      "Medical Health",
      "Trauma Support",
      "Mental Health"
    ]
  },
  {
    id: 10,
    emoji: "🏡",
    title: "Home & Garden",
    topics: [
      "Home Inspiration & Decor",
      "House Plants",
      "DIY & Crafts",
      "Gardening & Farming",
      "Sustainable Living",
      "Home Improvement"
    ]
  },
  {
    id: 11,
    emoji: "📜",
    title: "Humanities & Law",
    topics: ["Ethics & Philosophy", "Law", "History", "Languages"]
  },
  {
    id: 12,
    emoji: "🌈",
    title: "Identity & Relationships",
    topics: [
      "Relationships",
      "Gender & Sexual Orientation",
      "Family & Parenting",
      "Religion & Spirituality",
      "Culture, Race, & Ethnicity",
      "Love & Dating"
    ]
  },
  {
    id: 13,
    emoji: "🙉",
    title: "Internet Culture",
    topics: [
      "Memes",
      "Animals & Pets",
      "Cringe & Facepalm",
      "Reddit Meta",
      "Amazing",
      "Funny",
      "Crazy & Shocking",
      "Wholesome & Heartwarming",
      "Interesting",
      "Oddly Satisfying"
    ]
  },
  {
    id: 14,
    emoji: "🎞️",
    title: "Movies & TV",
    topics: [
      "Comedy Movies & Series",
      "Action Movies & Series",
      "Fantasy Movies & Series",
      "Documentary Movies & Series",
      "Drama Movies & Series",
      "Crime, Mystery, & Thriller Movies & Series",
      "Animated Movies & Series",
      "Sci-Fi Movies & Series",
      "Romance Movies & Series",
      "Reality TV",
      "TV News & Discussion",
      "Superhero Movies & Series",
      "Horror Movies & Series",
      "Movie News & Discussion"
    ]
  },
  {
    id: 15,
    emoji: "🎶",
    title: "Music",
    topics: [
      "Musical Instruments & Singing",
      "Classical Music",
      "Indie & Alternative Music",
      "K-Pop",
      "Music News & Discussion",
      "Dance & Electronic Music",
      "Country Music",
      "Hip-Hop & Rap Music",
      "Other Music Genres",
      "Jazz Music",
      "Rock Music",
      "R&B Music",
      "Pop Music",
      "Metal Music",
      "Music Production"
    ]
  },
  {
    id: 16,
    emoji: "🌿",
    title: "Nature & Outdoors",
    topics: ["Fishing", "Camping & Hiking", "Hunting", "Nature & Wildlife"]
  },
  {
    id: 17,
    emoji: "📰",
    title: "News & Politics",
    topics: ["News", "Politics", "Activism"]
  },
  {
    id: 18,
    emoji: "🌐",
    title: "Places & Travel",
    topics: [
      "Places in Africa",
      "Places in Europe",
      "Places in Australia & Oceania",
      "Places in Asia",
      "Places in South America",
      "Places in North America",
      "Places in the Middle East",
      "Travel & Holiday"
    ]
  },
  {
    id: 19,
    emoji: "✨",
    title: "Pop Culture",
    topics: [
      "Generations & Nostalgia",
      "Creators & Influencers",
      "Celebrities",
      "Podcasts",
      "Streamers",
      "Tarot & Astrology"
    ]
  },
  {
    id: 20,
    emoji: "✏️",
    title: "Q&As & Stories",
    topics: ["Stories & Confessions", "Q&As"]
  },
  {
    id: 21,
    emoji: "📖",
    title: "Reading & Writing",
    topics: ["Comics", "Books & Literature", "Writing"]
  },
  {
    id: 22,
    emoji: "🧪",
    title: "Sciences",
    topics: [
      "Biological Sciences",
      "Engineering",
      "Physics",
      "Mathematics",
      "Climate & Environment",
      "Other Sciences",
      "Science News & Discussion",
      "Psychology & Sociology",
      "Geography",
      "Data Science",
      "Chemistry",
      "Space & Astronomy"
    ]
  },
  {
    id: 23,
    emoji: "💀",
    title: "Spooky",
    topics: [
      "Paranormal & Unexplained",
      "Weird & Unusual",
      "True Crime",
      "Creepy"
    ]
  },
  {
    id: 24,
    emoji: "🏅",
    title: "Sports",
    topics: [
      "Ice Hockey",
      "College Sports",
      "Basketball",
      "Bikes & Cycling",
      "Cricket",
      "Baseball",
      "Soccer",
      "Rugby",
      "Racket Sports",
      "Motor Sports",
      "Golf",
      "Wrestling & Combat Sports",
      "Football",
      "Winter Sports",
      "Water Sports",
      "Sports News & Discussion",
      "Other Sports"
    ]
  },
  {
    id: 25,
    emoji: "🛰️",
    title: "Technology",
    topics: [
      "Consumer Electronics",
      "DIY Electronics",
      "Artificial Intelligence & Machine Learning",
      "Computers & Hardware",
      "Programming",
      "Software & Apps",
      "Virtual & Augmented Reality",
      "3D Printing",
      "Tech News & Discussion",
      "Streaming Services"
    ]
  },
  {
    id: 26,
    emoji: "🚗",
    title: "Vehicles",
    topics: [
      "Motorcycles",
      "Cars & Trucks",
      "Boating & Sailing",
      "Aviation",
      "Trains & Public Transportation"
    ]
  },
  {
    id: 27,
    emoji: "🧘",
    title: "Wellness",
    topics: [
      "Motivation & Self-Improvement",
      "Fitness",
      "Diet & Nutrition",
      "Weight Loss"
    ]
  },
  {
    id: 28,
    emoji: "🟥",
    title: "Adult Content",
    topics: ["Adult Content"]
  },
  {
    id: 29,
    emoji: "🔞",
    title: "Mature Topics",
    topics: [
      "No Topic/ Other Topic",
      "Smoking & Vaping",
      "Gambling",
      "Illegal & Recreational Drugs",
      "Guns & Weapons",
      "Military"
    ]
  }
];
