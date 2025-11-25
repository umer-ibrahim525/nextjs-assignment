import Link from "next/link";
import { ReactNode } from "react";

interface MenuItem {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: string;
}

interface MenuSectionProps {
  title?: string;
  items: MenuItem[];
  currentPath?: string;
}

export function MenuSection({ title, items, currentPath }: MenuSectionProps) {
  return (
    <div className="space-y-1">
      {title && (
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {title}
        </p>
      )}
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <MenuLink
              href={item.href}
              icon={item.icon}
              badge={item.badge}
              active={currentPath === item.href}
            >
              {item.label}
            </MenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface MenuLinkProps {
  href: string;
  icon: ReactNode;
  badge?: string;
  active?: boolean;
  children: ReactNode;
}

export function MenuLink({
  href,
  icon,
  badge,
  active,
  children,
}: MenuLinkProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200
        ${
          active
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }
      `}
    >
      <span className="flex items-center">
        <span className="w-5 h-5 mr-3 flex-shrink-0">{icon}</span>
        <span className="font-medium">{children}</span>
      </span>
      {badge && (
        <span
          className={`
          px-2 py-0.5 text-xs font-semibold rounded-full
          ${active ? "bg-white text-blue-600" : "bg-gray-700 text-gray-300"}
        `}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
      {children}
    </aside>
  );
}

interface SidebarHeaderProps {
  title: string;
  subtitle?: string;
  avatar?: ReactNode;
}

export function SidebarHeader({ title, subtitle, avatar }: SidebarHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-800">
      <div className="flex items-center space-x-3">
        {avatar}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 truncate">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface SidebarNavProps {
  children: ReactNode;
}

export function SidebarNav({ children }: SidebarNavProps) {
  return <nav className="flex-1 p-4 space-y-6 overflow-y-auto">{children}</nav>;
}

interface SidebarFooterProps {
  children: ReactNode;
}

export function SidebarFooter({ children }: SidebarFooterProps) {
  return <div className="p-4 border-t border-gray-800">{children}</div>;
}

interface LogoutButtonProps {
  action?: string;
  method?: string;
}

export function LogoutButton({
  action = "/api/auth/signout",
  method = "POST",
}: LogoutButtonProps) {
  return (
    <form action={action} method={method}>
      <button
        type="submit"
        className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </form>
  );
}
