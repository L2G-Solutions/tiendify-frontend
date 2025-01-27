import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button, Input } from '@nextui-org/react';
import { IconCircleCheck, IconInfoCircleFilled } from '@tabler/icons-react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteSecretKey } from '@/service/auth/secret-keys';

interface IDeleteApiKeyModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  secretApiKey?: SecretKey;
}

const DeleteApiKeyModal = ({ isOpen, onOpenChange, secretApiKey }: IDeleteApiKeyModalProps) => {
  const queryClient = useQueryClient();

  const [securityCheck, setSecurityCheck] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const deleteSecretKeyMutation = useMutation({
    mutationFn: deleteSecretKey,
    onSuccess: () => {
      queryClient.refetchQueries('secret-keys');
    },
  });

  const validateSecurityCheck = () => {
    if (securityCheck !== secretApiKey?.name) {
      return setErrorMessages(['The API key name must match the name of the API key you want to delete.']);
    }

    setErrorMessages([]);
    return true;
  };

  const handleCreateSecretKey = async () => {
    if (!validateSecurityCheck()) return;

    if (secretApiKey?.id) {
      await deleteSecretKeyMutation.mutateAsync(secretApiKey.id);
    }
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete API Key</ModalHeader>
            {deleteSecretKeyMutation.isSuccess ? (
              <ModalBody>
                <div className="text-success-700 inline-flex items-center gap-3 text-sm border border-success-200 bg-success-100 p-4 rounded-2xl">
                  <IconCircleCheck className="min-w-6" />
                  <p>
                    The API key has been successfully deleted. You can now close this modal window. If you want to
                    delete another key, please open this modal again.
                  </p>
                </div>
              </ModalBody>
            ) : (
              <ModalBody>
                <blockquote className="text-danger-700 inline-flex items-center gap-3 text-sm border border-danger-200 bg-danger-100 p-4 rounded-2xl">
                  <IconInfoCircleFilled className="min-w-5" />
                  <p>
                    Are you sure you want to delete the API key <strong>{secretApiKey?.name}</strong>? This action
                    cannot be undone, and you will not be able to use this key for authentication.
                  </p>
                </blockquote>
                <p className="mt-4">
                  To confirm, please type the name of the API key <strong>`{secretApiKey?.name}`</strong> below. This
                  action cannot be undone.
                </p>
                <Input
                  placeholder="Enter the API key name"
                  value={securityCheck}
                  onChange={(e) => setSecurityCheck(e.target.value)}
                />

                <ul className="list-disc pl-6">
                  {errorMessages.map((message, idx) => (
                    <li key={`error.${idx}`} className="text-danger">
                      {message}
                    </li>
                  ))}
                </ul>
              </ModalBody>
            )}
            <ModalFooter className="flex gap-4">
              <Button color="default" variant="light" onClick={onClose}>
                Close
              </Button>
              {!deleteSecretKeyMutation.isSuccess && (
                <Button
                  color="primary"
                  onClick={handleCreateSecretKey}
                  isLoading={deleteSecretKeyMutation.isLoading}
                  isDisabled={securityCheck !== secretApiKey?.name}
                >
                  Delete API Key
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteApiKeyModal;
