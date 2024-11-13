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
      {
        question: "Hvad er formålet med Dead Letter Channel?",
        answer:
          "At opbevare beskeder som messaging systemet ikke kunne levere, så de kan undersøges senere.",
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
        question: "Hvad er formålet med Message Expiration?",
        answer:
          "For at indikere hvornår en besked skal betragtes som forældet og ikke bør processeres.",
      },
      {
        question: "Hvad er et Document Message?",
        answer:
          "En besked der bruges til at overføre data mellem applikationer uden at specificere hvordan data skal behandles.",
      },
      {
        question: "Hvordan bruges Return Address pattern?",
        answer: "Det fortæller en responder hvor den skal sende sit svar hen.",
      },
      {
        question: "Hvad er formålet med Message Sequence?",
        answer:
          "At transmittere en vilkårlig stor mængde data ved at opdele den i en sekvens af relaterede beskeder.",
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
      {
        question: "Hvad er formålet med Envelope Wrapper?",
        answer:
          "At tillade eksisterende systemer at deltage i message udveksling der har specifikke krav til beskedformat, som f.eks. header felter eller kryptering.",
      },
      {
        question: "Hvad er formålet med Content Filter?",
        answer:
          "At simplificere håndteringen af store beskeder når man kun er interesseret i få data elementer.",
      },
      {
        question: "Hvad er formålet med en Normalizer?",
        answer:
          "At håndtere beskeder der er semantisk ækvivalente men ankommer i forskellige formater.",
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
      {
        question:
          "Hvad er den grundlæggende ide bag Messaging som integration style?",
        answer:
          "At applikationer kan kommunikere ved at sende beskeder til hinanden gennem message channels, hvilket giver løs kobling og asynkron kommunikation.",
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
  {
    title: "Messaging Systems",
    cards: [
      {
        question: "Hvad er hovedformålet med Pipes and Filters pattern?",
        answer:
          "At muliggøre kompleks message processing mens man bevarer uafhængighed og fleksibilitet mellem processing steps.",
      },
      {
        question: "Hvad er formålet med en Message Translator?",
        answer:
          "At muliggøre kommunikation mellem systemer der bruger forskellige dataformater ved at oversætte mellem formaterne.",
      },
      {
        question: "Hvad er en Message Endpoint's primære funktion?",
        answer:
          "At forbinde en applikation til en messaging channel så den kan sende og modtage beskeder.",
      },
    ],
  },
  {
    title: "Messaging Channels",
    cards: [
      {
        question: "Hvad er formålet med Guaranteed Delivery?",
        answer:
          "At sikre at en besked bliver leveret selv hvis messaging systemet fejler midlertidigt.",
      },
      {
        question: "Hvad er formålet med en Channel Adapter?",
        answer:
          "At forbinde en applikation til messaging systemet så den kan sende og modtage beskeder uden at kende til messaging protokollen.",
      },
      {
        question: "Hvad er hovedformålet med en Message Bus?",
        answer:
          "At skabe en arkitektur hvor separate applikationer kan arbejde sammen på en løst koblet måde, så applikationer nemt kan tilføjes eller fjernes.",
      },
      {
        question: "Hvad er formålet med en Messaging Bridge?",
        answer:
          "At forbinde multiple messaging systemer så beskeder der er tilgængelige i ét system også bliver tilgængelige i de andre.",
      },
    ],
  },
  {
    title: "Message Routing Patterns",
    cards: [
      {
        question: "Hvad er formålet med Recipient List?",
        answer:
          "At route en besked til en dynamisk specificeret liste af modtagere.",
      },
      {
        question: "Hvordan fungerer en Splitter?",
        answer:
          "Den opdeler en besked der indeholder multiple elementer, så hvert element kan processeres forskelligt.",
      },
      {
        question: "Hvad er formålet med en Aggregator?",
        answer:
          "At kombinere resultaterne af individuelle, men relaterede beskeder så de kan processeres som en helhed.",
      },
      {
        question: "Hvad løser en Resequencer?",
        answer:
          "At få en strøm af relaterede men ude-af-sekvens beskeder tilbage i den korrekte rækkefølge.",
      },
      {
        question: "Hvad er formålet med Scatter-Gather pattern?",
        answer:
          "At vedligeholde message flow når en besked skal sendes til multiple modtagere, der hver især kan sende svar tilbage.",
      },
      {
        question: "Hvordan fungerer Routing Slip pattern?",
        answer:
          "Det router en besked gennem en serie af processing steps, hvor sekvensen ikke er kendt på design-tidspunktet og kan variere for hver besked.",
      },
    ],
  },
  {
    title: "Messaging Endpoints",
    cards: [
      {
        question: "Hvad er formålet med en Messaging Gateway?",
        answer:
          "At indkapsle adgangen til messaging systemet fra resten af applikationen.",
      },
      {
        question: "Hvad gør en Messaging Mapper?",
        answer:
          "Den flytter data mellem domæne objekter og messaging infrastrukturen mens de holdes uafhængige af hinanden.",
      },
      {
        question: "Hvad er en Transactional Client?",
        answer:
          "En client der kan kontrollere sine transaktioner med messaging systemet.",
      },
      {
        question:
          "Hvad er forskellen mellem Polling Consumer og Event-Driven Consumer?",
        answer:
          "Polling Consumer konsumerer beskeder når applikationen er klar, mens Event-Driven Consumer automatisk konsumerer beskeder så snart de bliver tilgængelige.",
      },
      {
        question: "Hvordan fungerer Competing Consumers pattern?",
        answer:
          "Det tillader en messaging client at processere multiple beskeder concurrent ved at have flere consumers der konkurrerer om beskeder fra samme channel.",
      },
      {
        question: "Hvad er formålet med en Message Dispatcher?",
        answer:
          "At koordinere message processing mellem multiple consumers på en enkelt channel.",
      },
      {
        question: "Hvordan fungerer en Selective Consumer?",
        answer:
          "Den tillader en message consumer at vælge hvilke beskeder den ønsker at modtage baseret på specifikke kriterier.",
      },
      {
        question: "Hvad er formålet med Durable Subscriber?",
        answer:
          "At sikre at en subscriber ikke går glip af beskeder mens den ikke lytter efter dem.",
      },
    ],
  },
  {
    title: "Avancerede Messaging Patterns",
    cards: [
      {
        question: "Hvad er formålet med Process Manager pattern?",
        answer:
          "At route beskeder gennem multiple processing steps når de nødvendige steps måske ikke er kendt på design-tidspunktet og ikke nødvendigvis er sekventielle.",
      },
      {
        question: "Hvordan fungerer Composed Message Processor pattern?",
        answer:
          "Den vedligeholder det overordnede message flow når en besked består af multiple elementer der hver kræver forskellig processing.",
      },
      {
        question: "Hvad er hovedformålet med Message Broker pattern?",
        answer:
          "At dekoble beskedens destination fra afsenderen og vedligeholde central kontrol over message flow.",
      },
      {
        question: "Hvad er formålet med Dynamic Router?",
        answer:
          "At undgå at routeren er afhængig af alle mulige destinationer mens den bevarer sin effektivitet.",
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
