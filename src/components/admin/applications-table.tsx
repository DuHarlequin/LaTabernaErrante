"use client";

import type { CharacterApplication } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, XCircle, Eye } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

interface ApplicationsTableProps {
  applications: CharacterApplication[];
  onUpdateApplication: (id: string, status: 'accepted' | 'rejected', reason?: string) => void;
}

export default function ApplicationsTable({ applications, onUpdateApplication }: ApplicationsTableProps) {
  const [selectedApplication, setSelectedApplication] = useState<CharacterApplication | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<'accept' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const { toast } = useToast();

  const openReviewDialog = (application: CharacterApplication, action: 'accept' | 'reject') => {
    setSelectedApplication(application);
    setReviewAction(action);
    setRejectionReason("");
    setIsReviewDialogOpen(true);
  };

  const handleReviewSubmit = () => {
    if (!selectedApplication || !reviewAction) return;

    if (reviewAction === 'reject' && !rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejecting the application.",
        variant: "destructive",
      });
      return;
    }

    onUpdateApplication(selectedApplication.id, reviewAction, reviewAction === 'reject' ? rejectionReason : undefined);
    toast({
      title: `Application ${reviewAction === 'accept' ? 'Accepted' : 'Rejected'}`,
      description: `${selectedApplication.characterName}'s application has been ${reviewAction === 'accept' ? 'accepted' : 'rejected'}.`,
    });
    setIsReviewDialogOpen(false);
    setSelectedApplication(null);
  };
  
  const getBadgeVariant = (status: CharacterApplication['status']) => {
    switch (status) {
      case 'accepted': return 'default'; // Default often green-ish or primary
      case 'rejected': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Character Name</TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium text-primary">{app.characterName} {app.title && `- ${app.title}`}</TableCell>
              <TableCell>{app.userName || app.userId}</TableCell>
              <TableCell>{format(new Date(app.submissionDate), "PPP p")}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(app.status)} className="capitalize">{app.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => alert(`Viewing details for ${app.characterName} (Not Implemented)`)}>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {app.status === 'pending' && (
                      <>
                        <DropdownMenuItem onClick={() => openReviewDialog(app, 'accept')} className="text-green-500 focus:text-green-600 focus:bg-green-500/10">
                          <CheckCircle className="mr-2 h-4 w-4" /> Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openReviewDialog(app, 'reject')} className="text-red-500 focus:text-red-600 focus:bg-red-500/10">
                           <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                      </>
                    )}
                     {app.status !== 'pending' && (
                        <DropdownMenuItem disabled>No actions available</DropdownMenuItem>
                     )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {applications.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No pending applications found.</p>
      )}

      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">
              {reviewAction === 'accept' ? 'Accept' : 'Reject'} Application: {selectedApplication?.characterName}
            </DialogTitle>
            <DialogDescription>
              You are about to {reviewAction} this character application. 
              {reviewAction === 'reject' && " Please provide a reason for rejection."}
              {reviewAction === 'accept' && " The applicant will be notified."}
            </DialogDescription>
          </DialogHeader>
          {reviewAction === 'reject' && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="rejectionReason" className="text-left">
                  Reason for Rejection
                </Label>
                <Textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Explain why this application is being rejected..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}
           {reviewAction === 'accept' && (
            <div className="py-4">
                <p>Confirming acceptance for <span className="font-semibold text-primary">{selectedApplication?.characterName}</span>.</p>
            </div>
           )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleReviewSubmit} 
              variant={reviewAction === 'reject' ? 'destructive' : 'default'}
              className={reviewAction === 'accept' ? 'bg-green-600 hover:bg-green-700 text-white' : ''}
            >
              Confirm {reviewAction === 'accept' ? 'Acceptance' : 'Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
