import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";

interface AchievementFields {
  lang: Locale;
  category: string;
  fullName?: string;
  teamName?: string;
  ward?: string;
  parentsNames?: string;
  teamMembersNames?: string;
  issueDate: string;
  achievement: string;
  submittedBy: string;
}

export function getAchievementEmailHtml({
  lang,
  category,
  fullName,
  teamName,
  ward,
  parentsNames,
  teamMembersNames,
  issueDate,
  achievement,
  submittedBy,
}: AchievementFields) {
  const t = useTranslations(lang);

  const individualAchievementHTML = `<h1>${t("achievement.individual-achievement")}</h1>
      <p><strong>${t("achievement.full-name")}:</strong> ${fullName}</p>
      <p><strong>${t("achievement.parents-names")}:</strong> ${parentsNames}</p>
      <p><strong>${t("achievement.ward")}:</strong> ${ward}</p>`;

  const teamAchievementHTML = `<h1>${t("achievement.team-achievement")}</h1>
      <p><strong>${t("achievement.team-name")}:</strong> ${teamName}</p>
      <p><strong>${t("achievement.team-members-names")}:</strong> ${teamMembersNames}</p>`;

  return `
    ${category === "Individual Achievement" ? individualAchievementHTML : teamAchievementHTML}
      <p><strong>${t("achievement")}:</strong> ${achievement}</p>
      <p><strong>${t("achievement.issue-date")} (dd/mm/yyyy):</strong> ${issueDate}</p>
      <p><strong>${t("achievement.submitted-by")}:</strong> ${submittedBy}</p>
  `;
}
