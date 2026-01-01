"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { mockSubmissions, type Submission } from "@/lib/data/submissions"
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Mail,
  Globe,
  Calendar,
  Hotel,
  UtensilsCrossed,
  ActivityIcon,
  MapPinned,
  ShoppingBag,
} from "lucide-react"

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const pendingSubmissions = submissions.filter((s) => s.status === "pending")
  const approvedSubmissions = submissions.filter((s) => s.status === "approved")
  const rejectedSubmissions = submissions.filter((s) => s.status === "rejected")

  const handleApprove = (id: string) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: "approved" as const } : s)))
    setDialogOpen(false)
    setSelectedSubmission(null)
  }

  const handleReject = (id: string) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: "rejected" as const } : s)))
    setDialogOpen(false)
    setSelectedSubmission(null)
  }

  const openSubmissionDialog = (submission: Submission) => {
    setSelectedSubmission(submission)
    setDialogOpen(true)
  }

  const categoryInfo = {
    hotel: { icon: Hotel, label: "Accommodation", color: "bg-blue-500" },
    restaurant: { icon: UtensilsCrossed, label: "Restaurant", color: "bg-orange-500" },
    activity: { icon: ActivityIcon, label: "Activity", color: "bg-green-500" },
    attraction: { icon: MapPinned, label: "Attraction", color: "bg-purple-500" },
    shopping: { icon: ShoppingBag, label: "Shopping", color: "bg-pink-500" },
  }

  const statusInfo = {
    pending: { color: "bg-yellow-500", label: "Pending", icon: Clock },
    approved: { color: "bg-green-500", label: "Approved", icon: CheckCircle },
    rejected: { color: "bg-red-500", label: "Rejected", icon: XCircle },
  }

  const SubmissionCard = ({ submission }: { submission: Submission }) => {
    const CategoryIcon = categoryInfo[submission.category].icon
    const StatusIcon = statusInfo[submission.status].icon

    return (
      <Card
        className="hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => openSubmissionDialog(submission)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{submission.placeName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {submission.destinationName}
              </div>
            </div>
            <Badge className={`${statusInfo[submission.status].color} text-white border-0`}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {statusInfo[submission.status].label}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{submission.description}</p>

          <div className="flex items-center justify-between">
            <Badge className={`${categoryInfo[submission.category].color} text-white border-0`} variant="secondary">
              <CategoryIcon className="mr-1 h-3 w-3" />
              {categoryInfo[submission.category].label}
            </Badge>
            <div className="text-xs text-muted-foreground">{new Date(submission.submittedAt).toLocaleDateString()}</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-24 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-serif font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-muted-foreground">Review and manage community submissions</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
                      <p className="text-3xl font-bold">{pendingSubmissions.length}</p>
                    </div>
                    <Clock className="h-10 w-10 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Approved</p>
                      <p className="text-3xl font-bold">{approvedSubmissions.length}</p>
                    </div>
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                      <p className="text-3xl font-bold">{rejectedSubmissions.length}</p>
                    </div>
                    <XCircle className="h-10 w-10 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({approvedSubmissions.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({rejectedSubmissions.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                {pendingSubmissions.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No pending submissions</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pendingSubmissions.map((submission) => (
                      <SubmissionCard key={submission.id} submission={submission} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="approved" className="mt-6">
                {approvedSubmissions.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No approved submissions yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {approvedSubmissions.map((submission) => (
                      <SubmissionCard key={submission.id} submission={submission} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="rejected" className="mt-6">
                {rejectedSubmissions.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No rejected submissions</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rejectedSubmissions.map((submission) => (
                      <SubmissionCard key={submission.id} submission={submission} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Submission Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedSubmission.placeName}</DialogTitle>
                <DialogDescription>Review submission details</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex gap-2">
                  <Badge className={`${categoryInfo[selectedSubmission.category].color} text-white border-0`}>
                    {categoryInfo[selectedSubmission.category].label}
                  </Badge>
                  <Badge className={`${statusInfo[selectedSubmission.status].color} text-white border-0`}>
                    {statusInfo[selectedSubmission.status].label}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedSubmission.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Destination
                    </h4>
                    <p className="text-muted-foreground">{selectedSubmission.destinationName}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Submitted
                    </h4>
                    <p className="text-muted-foreground">{new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Address</h4>
                  <p className="text-muted-foreground">{selectedSubmission.address}</p>
                </div>

                {selectedSubmission.website && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-primary" />
                      Website
                    </h4>
                    <a
                      href={selectedSubmission.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {selectedSubmission.website}
                    </a>
                  </div>
                )}

                {selectedSubmission.imageUrl && (
                  <div>
                    <h4 className="font-semibold mb-2">Image</h4>
                    <div className="bg-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
                      Image URL: {selectedSubmission.imageUrl}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Submitted By</h4>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{selectedSubmission.submittedBy}</span>
                    <span>({selectedSubmission.email})</span>
                  </div>
                </div>
              </div>

              {selectedSubmission.status === "pending" && (
                <DialogFooter className="flex gap-2">
                  <Button variant="destructive" onClick={() => handleReject(selectedSubmission.id)}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleApprove(selectedSubmission.id)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </DialogFooter>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
