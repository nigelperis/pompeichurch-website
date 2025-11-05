"use client";

import Mail from "~/assets/icons/mail.svg?react";
import Youtube from "~/assets/react-icons/youtube.svg?react";
import Facebook from "~/assets/icons/facebook.svg?react";
import Instagram from "~/assets/react-icons/instagram.svg?react";
import Phone from "~/assets/react-icons/phone.svg?react";
import MapPin from "~/assets/icons/map-pin.svg?react";
import { useTranslations } from "~/i18n/utils";
import type { Locale } from "~/enums/locale";

const currentYear = new Date().getFullYear();

export default function Footer({ lang }: { lang: Locale }) {
  const t = useTranslations(lang);

  const sections = [
    {
      title: "About Us",
      links: [
        { label: "Our History", href: "/parish-history" },
        { label: "Wards", href: "/wards" },
        { label: "Convents", href: "/convents" },
        { label: "Institutions", href: "/institutions" },
      ],
    },
    {
      title: "News",
      links: [
        { label: "Obituary", href: "/obituary" },
        { label: "Events", href: "/events" },
      ],
    },
    {
      title: "Others",
      links: [
        { label: "Gallery", href: "/gallery" },
        { label: "Pompeichem Falkem", href: "/pompeichem-falkem" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:pompeichurchgurpur@gmail.com",
      label: "Email",
      ariaLabel: "Email pompeichurchgurpur@gmail.com",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/ladyofpompeichurch.gurpur/",
      label: "Facebook",
      ariaLabel: "Visit our Facebook page",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/our_lady_of_pompei_church/",
      label: "Instagram",
      ariaLabel: "Follow us on Instagram",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@pompeichurchmedia8386",
      label: "YouTube",
      ariaLabel: "Subscribe to our YouTube channel",
    },
    {
      icon: Phone,
      href: "tel:+918277939340",
      label: "Phone",
      ariaLabel: "Call +91 82779 39340",
    },
  ];

  return (
    <footer className="bg-slate-900 border-t-2 border-natgeo-yellow text-white font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-12 lg:py-16">
        {/* Top Section: Branding + Social */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Church Info */}
          <div className="md:col-span-1">
            <h3 className="text-md font-bold text-natgeo-yellow mb-4">
              {t("landing.church-name")}
            </h3>
            <h3 className="text-md font-bold text-natgeo-yellow mb-4">
              {t("landing.town-name")}
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith("mailto:") ||
                      link.href.startsWith("tel:")
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      link.href.startsWith("mailto:") ||
                      link.href.startsWith("tel:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={link.ariaLabel}
                    className="hover:text-yellow-400 transition-colors duration-200 text-white"
                  >
                    <IconComponent width={20} height={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Contact Info
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <Phone
                  width={18}
                  height={18}
                  className="text-natgeo-yellow mt-0.5 flex-shrink-0"
                />
                <a
                  href="tel:+918277939340"
                  className="hover:text-yellow-400 transition-colors"
                >
                  +91 82779 39340
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  width={18}
                  height={18}
                  className="text-natgeo-yellow mt-0.5 flex-shrink-0"
                />
                <a
                  href="mailto:pompeichurchgurpur@gmail.com"
                  className="hover:text-yellow-400 transition-colors"
                >
                  pompeichurchgurpur@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  width={18}
                  height={18}
                  className="mt-0.5 flex-shrink-0"
                />
                <span>Gurpur Kaikamba, Mangalore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-slate-950 border-t border-slate-700 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p className="text-center md:text-left">
            &copy;{currentYear} Our Lady of Pompei Church. All Rights Reserved.
          </p>
          <p className="text-center">
            <span className="font-semibold">Powered by:</span> Commission for
            Social Communication, Gurpur Kaikamba
          </p>
        </div>
      </div>
    </footer>
  );
}
