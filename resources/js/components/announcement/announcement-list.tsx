"use client"

interface Announcement {
  id: number
  title: string
  category: string
  time: string
  image?: string
  content?: string
  description?: string
}

interface AnnouncementListProps {
  announcements: Announcement[]
  onSelectAnnouncement: (announcement: Announcement) => void
}

export default function AnnouncementList({ announcements, onSelectAnnouncement }: AnnouncementListProps) {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          onClick={() => onSelectAnnouncement(announcement)}
          className="border-2 border-blue-500 rounded-lg p-6 cursor-pointer hover:bg-blue-50 transition bg-white"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{announcement.category}</p>
            </div>
            <span className="text-gray-700 font-medium">{announcement.time}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
