import {
    Action,
    BaseResource,
    exceptions,
    handlerEvent,
    HandlerErrorCode,
    LoggerProxy,
    OperationStatus,
    Optional,
    ProgressEvent,
    ResourceHandlerRequest,
    SessionProxy,
} from '@amazon-web-services-cloudformation/cloudformation-cli-typescript-lib';
import { ResourceModel } from './models';

interface CallbackContext extends Record<string, any> {}

class Resource extends BaseResource<ResourceModel> {

    /**
     * CloudFormation invokes this handler when the resource is initially created
     * during stack create operations.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to allow the passing through of additional
     * state or metadata between subsequent retries
     * @param logger Logger to proxy requests to default publishers
     */
    @handlerEvent(Action.Create)
    public async create(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: CallbackContext,
        logger: LoggerProxy
    ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
        const model = new ResourceModel(request.desiredResourceState);
        const progress = ProgressEvent.progress<ProgressEvent<ResourceModel, CallbackContext>>(model);
        // TODO: put code here

        // if actual member:https://docs.github.com/en/rest/orgs/members#check-organization-membership-for-a-user
        // or has a pending invitation: https://docs.github.com/en/rest/orgs/members#list-failed-organization-invitations
        // throw already exist
        // create: https://docs.github.com/en/rest/orgs/members#create-an-organization-invitation

        return progress;
    }

    /**
     * CloudFormation invokes this handler when the resource is updated
     * as part of a stack update operation.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to allow the passing through of additional
     * state or metadata between subsequent retries
     * @param logger Logger to proxy requests to default publishers
     */
    @handlerEvent(Action.Update)
    public async update(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: CallbackContext,
        logger: LoggerProxy
    ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
        const model = new ResourceModel(request.desiredResourceState);
        const progress = ProgressEvent.progress<ProgressEvent<ResourceModel, CallbackContext>>(model);
        // TODO: put code here
        // if is an actual member-> update
        progress.status = OperationStatus.Success;
        return progress;
    }

    /**
     * CloudFormation invokes this handler when the resource is deleted, either when
     * the resource is deleted from the stack as part of a stack update operation,
     * or the stack itself is deleted.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to allow the passing through of additional
     * state or metadata between subsequent retries
     * @param logger Logger to proxy requests to default publishers
     */
    @handlerEvent(Action.Delete)
    public async delete(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: CallbackContext,
        logger: LoggerProxy
    ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
        const model = new ResourceModel(request.desiredResourceState);
        const progress = ProgressEvent.progress<ProgressEvent<ResourceModel, CallbackContext>>();
        // TODO: put code here
        progress.status = OperationStatus.Success;
        return progress;
    }

    /**
     * CloudFormation invokes this handler as part of a stack update operation when
     * detailed information about the resource's current state is required.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to allow the passing through of additional
     * state or metadata between subsequent retries
     * @param logger Logger to proxy requests to default publishers
     */
    @handlerEvent(Action.Read)
    public async read(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: CallbackContext,
        logger: LoggerProxy
    ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
        const model = new ResourceModel(request.desiredResourceState);
        // TODO: put code here
        const progress = ProgressEvent.success<ProgressEvent<ResourceModel, CallbackContext>>(model);
        return progress;
    }

    /**
     * CloudFormation invokes this handler when summary information about multiple
     * resources of this resource provider is required.
     *
     * @param session Current AWS session passed through from caller
     * @param request The request object for the provisioning request passed to the implementor
     * @param callbackContext Custom context object to allow the passing through of additional
     * state or metadata between subsequent retries
     * @param logger Logger to proxy requests to default publishers
     */
    @handlerEvent(Action.List)
    public async list(
        session: Optional<SessionProxy>,
        request: ResourceHandlerRequest<ResourceModel>,
        callbackContext: CallbackContext,
        logger: LoggerProxy
    ): Promise<ProgressEvent<ResourceModel, CallbackContext>> {
        const model = new ResourceModel(request.desiredResourceState);
        // TODO: put code here
        const progress = ProgressEvent.builder<ProgressEvent<ResourceModel, CallbackContext>>()
            .status(OperationStatus.Success)
            .resourceModels([model])
            .build();
        return progress;
    }
}

export const resource = new Resource(ResourceModel.TYPE_NAME, ResourceModel);

// Entrypoint for production usage after registered in CloudFormation
export const entrypoint = resource.entrypoint;

// Entrypoint used for local testing
export const testEntrypoint = resource.testEntrypoint;
