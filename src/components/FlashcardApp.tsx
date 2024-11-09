import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  BookmarkPlus,
  List,
} from "lucide-react";

const sections = [
  {
    title: "Mikroservices Arkitektur",
    cards: [
      {
        question:
          "Hvad er den væsentligste forskel mellem mikroservices og monolitisk arkitektur?",
        answer:
          "I mikroservices er systemet opdelt i uafhængige services der kan udvikles og deployes separat, mens en monolitisk arkitektur er én samlet applikation.",
      },
      {
        question: "Hvorfor har hver mikroservice typisk sin egen database?",
        answer:
          "For at sikre løs kobling og data uafhængighed, så hver service kan kontrollere og ændre sin egen datamodel uden at påvirke andre services.",
      },
      {
        question:
          "Hvilken fordel giver mikroservices ift. valg af teknologier?",
        answer:
          "Hver mikroservice kan udvikles i forskellige programmeringssprog og teknologier, optimeret til dens specifikke behov.",
      },
    ],
  },
  {
    title: "Messaging og Kommunikation",
    cards: [
      {
        question: "Hvad er forskellen mellem commands og events i messaging?",
        answer:
          "Commands er direkte instruktioner der kræver en specifik handling, mens events er meddelelser om noget der er sket.",
      },
      {
        question:
          "Hvad er den primære forskel mellem synkron og asynkron kommunikation i mikroservices?",
        answer:
          "Ved synkron kommunikation venter kalderen på svar, mens ved asynkron kommunikation fortsætter kalderen uden at vente på svar.",
      },
      {
        question:
          "Hvad er hovedformålet med en message broker i mikroservice arkitektur?",
        answer:
          "At håndtere asynkron kommunikation mellem services og sikre pålidelig levering af beskeder.",
      },
      {
        question: "Hvorfor bruges publish/subscribe pattern i mikroservices?",
        answer:
          "For at muliggøre at én service kan sende beskeder til mange modtagere uden at kende dem specifikt.",
      },
    ],
  },
  {
    title: "Message Routing og Channels",
    cards: [
      {
        question:
          "Hvad er forskellen mellem Point-to-Point og Publish/Subscribe channels?",
        answer:
          "Point-to-Point sender beskeder til én specifik modtager, mens Publish/Subscribe sender til alle interesserede modtagere.",
      },
      {
        question: "Hvad er formålet med en Content-Based Router?",
        answer:
          "At dirigere beskeder til forskellige destinations baseret på beskedens indhold.",
      },
      {
        question: "Hvordan fungerer en Message Filter?",
        answer:
          "Den evaluerer beskeder baseret på kriterier og videresender kun de beskeder der matcher kriterierne.",
      },
      {
        question: "Hvorfor bruges Invalid Message Channel?",
        answer:
          "For at håndtere beskeder der ikke kan processeres korrekt og kræver manuel intervention.",
      },
    ],
  },
  {
    title: "Message Construction",
    cards: [
      {
        question: "Hvad er forskellen på Command Message og Event Message?",
        answer:
          "Command Message invokerer en procedure, mens Event Message transmitterer information om en hændelse.",
      },
      {
        question: "Hvad er formålet med Correlation Identifier?",
        answer:
          "At lade en requestor identificere hvilken request en modtaget reply hører til.",
      },
      {
        question: "Hvorfor bruges Message Expiration?",
        answer:
          "For at indikere hvornår en besked skal betragtes som forældet og ikke bør processeres.",
      },
    ],
  },
  {
    title: "Message Transformation",
    cards: [
      {
        question: "Hvad er formålet med Content Enricher?",
        answer:
          "At tilføje manglende data til en besked når afsenderen ikke har alle nødvendige data tilgængelige.",
      },
      {
        question: "Hvordan hjælper en Canonical Data Model?",
        answer:
          "Den minimerer afhængigheder når man integrerer applikationer der bruger forskellige dataformater.",
      },
      {
        question: "Hvad løser Claim Check pattern?",
        answer:
          "Den reducerer datamængden i beskeder uden at miste information ved at gemme data eksternt.",
      },
    ],
  },
  {
    title: "Integration Styles",
    cards: [
      {
        question: "Hvad er File Transfer integration?",
        answer:
          "En integrationsstil hvor applikationer integreres ved at producere filer som andre applikationer kan konsumere.",
      },
      {
        question: "Hvad er Shared Database integration?",
        answer:
          "En integrationsstil hvor applikationer deler information ved at gemme det i en fælles database.",
      },
      {
        question: "Hvad er Remote Procedure Invocation?",
        answer:
          "En integrationsstil hvor en applikation eksponerer nogle af sine procedurer så andre applikationer kan kalde dem remotely.",
      },
    ],
  },
  {
    title: "Sikkerhed",
    cards: [
      {
        question:
          "Hvad er den største udfordring ved autentificering i mikroservices?",
        answer:
          "At sikre at services kan verificere hinandens identitet på tværs af et distribueret system.",
      },
      {
        question:
          "Hvorfor er distributed tracing vigtigt i mikroservice arkitektur?",
        answer:
          "For at kunne spore og fejlfinde requests der går gennem multiple services.",
      },
      {
        question: "Hvad er formålet med en dead letter queue?",
        answer:
          "At opsamle beskeder der ikke kunne processeres korrekt, så de kan analyseres og eventuelt reprocesseres.",
      },
    ],
  },
  {
    title: "Test og Kvalitetssikring",
    cards: [
      {
        question:
          "Hvorfor er contract testing særligt vigtig i mikroservice arkitektur?",
        answer:
          "For at sikre at ændringer i én service ikke bryder API-kontrakten med andre services.",
      },
      {
        question:
          "Hvad er forskellen mellem integration testing og end-to-end testing?",
        answer:
          "Integration testing tester samspillet mellem enkelte services, mens end-to-end testing tester hele systemets flow fra start til slut.",
      },
      {
        question:
          "Hvorfor er mocking særligt relevant i unit testing af mikroservices?",
        answer:
          "For at kunne teste en service isoleret uden afhængigheder til andre services.",
      },
    ],
  },
];

const FlashcardApp = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSectionList, setShowSectionList] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<
    Array<{ question: string; answer: string }>
  >([]);
  const [isShuffled, setIsShuffled] = useState(false);

  // Beregn total antal kort og nuværende kort nummer
  const totalCards = sections.reduce(
    (sum, section) => sum + section.cards.length,
    0
  );
  const currentCardNumber = isShuffled
    ? currentCard + 1
    : sections
        .slice(0, currentSection)
        .reduce((sum, section) => sum + section.cards.length, 0) +
      currentCard +
      1;

  // Funktion til at blande kort
  const shuffleCards = () => {
    const allCards = sections.flatMap((section) =>
      section.cards.map((card) => ({
        ...card,
        section: section.title,
      }))
    );

    // Fisher-Yates shuffle algorithm
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }

    setShuffledCards(allCards);
    setCurrentCard(0);
    setIsShuffled(true);
    setShowAnswer(false);
  };

  // Reset til normal visning
  const resetCards = () => {
    setIsShuffled(false);
    setCurrentSection(0);
    setCurrentCard(0);
    setShowAnswer(false);
  };

  // Få det aktuelle kort
  const getCurrentCard = () => {
    if (isShuffled) {
      return shuffledCards[currentCard];
    }
    return sections[currentSection].cards[currentCard];
  };

  const currentCardData = getCurrentCard();

  // Navigation
  const nextCard = () => {
    setShowAnswer(false);
    if (isShuffled) {
      if (currentCard < shuffledCards.length - 1) {
        setCurrentCard(currentCard + 1);
      }
    } else {
      if (currentCard < sections[currentSection].cards.length - 1) {
        setCurrentCard(currentCard + 1);
      } else if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        setCurrentCard(0);
      }
    }
  };

  const previousCard = () => {
    setShowAnswer(false);
    if (isShuffled) {
      if (currentCard > 0) {
        setCurrentCard(currentCard - 1);
      }
    } else {
      if (currentCard > 0) {
        setCurrentCard(currentCard - 1);
      } else if (currentSection > 0) {
        setCurrentSection(currentSection - 1);
        setCurrentCard(sections[currentSection - 1].cards.length - 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl space-y-4">
        <div className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            {isShuffled ? "Blandede Kort" : sections[currentSection].title}
          </CardTitle>
          <p className="text-sm text-gray-600">
            Kort {currentCardNumber} af {totalCards}
          </p>
        </div>

        <Card
          className="min-h-[300px] cursor-pointer"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
            <div className="text-center space-y-4">
              <div className="text-lg font-medium">
                {currentCardData?.question}
              </div>
              {showAnswer && (
                <div className="pt-4 border-t text-gray-700">
                  {currentCardData?.answer}
                </div>
              )}
              {!showAnswer && (
                <div className="text-sm text-gray-500 mt-4">
                  Klik for at se svaret
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button
            onClick={previousCard}
            disabled={
              isShuffled
                ? currentCard === 0
                : currentSection === 0 && currentCard === 0
            }
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Forrige
          </Button>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={isShuffled ? resetCards : shuffleCards}
            >
              <Shuffle className="h-4 w-4 mr-2" />
              {isShuffled ? "Nulstil" : "Bland"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSectionList(!showSectionList)}
            >
              <List className="h-4 w-4 mr-2" />
              Oversigt
            </Button>
          </div>

          <Button
            onClick={nextCard}
            disabled={
              isShuffled
                ? currentCard === shuffledCards.length - 1
                : currentSection === sections.length - 1 &&
                  currentCard === sections[sections.length - 1].cards.length - 1
            }
            variant="outline"
          >
            Næste
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Sektionsoversigt */}
        {showSectionList && (
          <Card className="mt-4">
            <CardContent className="p-4">
              {sections.map((section, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start mb-2"
                  onClick={() => {
                    setCurrentSection(index);
                    setCurrentCard(0);
                    setIsShuffled(false);
                    setShowSectionList(false);
                    setShowAnswer(false);
                  }}
                >
                  {section.title} ({section.cards.length} kort)
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FlashcardApp;
