import { Locale } from "~/enums/locale";
import { Gender, RelationType } from "~/enums/obituary";

const konkaniPronouns = {
  male: {
    pronoun1: "ತಾಕಾ",
    pronoun2: "ತಾಚೆರ್",
    pronoun3: "ತಾಚೊ",
  },
  female: {
    pronoun1: "ತಿಕಾ",
    pronoun2: "ತಿಚೆರ್",
    pronoun3: "ತಿಚೊ",
  },
};

const englishPronouns = {
  male: {
    pronoun1: "him",
    pronoun2: "his"
  },
  female: {
    pronoun1: "her",
    pronoun2: "her"
  },
};

function getGenderFromRelation(relationType?: RelationType): Gender {
  switch (relationType) {
    case RelationType.HUSBAND:
    case RelationType.SON:
      return Gender.MALE;
    case RelationType.WIFE:
    case RelationType.DAUGHTER:
      return Gender.FEMALE;
    default:
      return Gender.MALE;
  }
}

export function getFuneralPrayer(lang: Locale, relationType?: RelationType): string {
  const gender = getGenderFromRelation(relationType);

  if (lang === Locale.EN) {
    const { pronoun1, pronoun2 } = englishPronouns[gender];
    return `Eternal rest grant unto ${pronoun1}, O Lord, and let perpetual light shine upon ${pronoun1}. May ${pronoun2} soul rest in peace. Amen.`;
  } else {
    const { pronoun1, pronoun2, pronoun3 } = konkaniPronouns[gender];
    return `ಸಾಸ್ಣಾಚೊ ವಿಶೆವ್, ದಿ ${pronoun1} ಏ ಸೊಮ್ಯಾ, ಆನಿ ನಿರಂತರ್ ಪ್ರಕಾಸ್, ${pronoun2} ಫಾಂಕುಂದಿ, ಸಮಾಧಾನೆನ್ ${pronoun3} ಅತ್ಮೊ, ವಿಶೆವ್ ಘೆಂವ್ದಿ. ಆಮೆನ್.`;
  }
}